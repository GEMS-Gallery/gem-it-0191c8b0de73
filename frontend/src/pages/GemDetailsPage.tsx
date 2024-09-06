import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { backend } from '../../declarations/backend';
import { Box, Typography, Link, Button, CircularProgress, Chip, Card, CardMedia } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import TokenIcon from '@mui/icons-material/Token';

interface Gem {
  id: bigint;
  title: string;
  description: string | null;
  url: string;
  upvotes: bigint;
  downvotes: bigint;
  timestamp: bigint;
  category: { Brazil: null } | { Africa: null };
  color: string;
  priceCategory: { High: null } | { Medium: null } | { Low: null };
  countryOfOrigin: string;
  imageUrl: string | null;
  nftId: bigint | null;
}

const GemDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [gem, setGem] = useState<Gem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGem();
  }, [id]);

  const fetchGem = async () => {
    if (!id) return;
    try {
      const gemData = await backend.getGem(BigInt(id));
      if (gemData) {
        setGem(gemData);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching gem:', error);
      setLoading(false);
    }
  };

  const handleVote = async (isUpvote: boolean) => {
    if (!gem) return;
    try {
      if (isUpvote) {
        await backend.upvoteGem(gem.id);
      } else {
        await backend.downvoteGem(gem.id);
      }
      fetchGem();
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const handleCreateNFT = async () => {
    if (!gem) return;
    try {
      const result = await backend.createNFT(gem.id);
      if ('ok' in result) {
        console.log('NFT created with ID:', result.ok);
        fetchGem();
      } else {
        console.error('Error creating NFT:', result.err);
      }
    } catch (error) {
      console.error('Error creating NFT:', error);
    }
  };

  const getCategoryName = (category: { Brazil: null } | { Africa: null }): string => {
    if ('Brazil' in category) return 'Brazil';
    if ('Africa' in category) return 'Africa';
    return 'Unknown';
  };

  const getPriceCategoryName = (priceCategory: { High: null } | { Medium: null } | { Low: null }): string => {
    if ('High' in priceCategory) return 'High';
    if ('Medium' in priceCategory) return 'Medium';
    if ('Low' in priceCategory) return 'Low';
    return 'Unknown';
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!gem) {
    return <Typography>Gem not found</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {gem.title}
      </Typography>
      {gem.imageUrl && (
        <Card sx={{ maxWidth: 345, mb: 2 }}>
          <CardMedia
            component="img"
            height="140"
            image={gem.imageUrl}
            alt={gem.title}
          />
        </Card>
      )}
      <Typography variant="body1" paragraph>
        {gem.description}
      </Typography>
      <Chip label={getCategoryName(gem.category)} color="primary" sx={{ mr: 1, mb: 1 }} />
      <Chip label={gem.color} sx={{ mr: 1, mb: 1 }} />
      <Chip label={getPriceCategoryName(gem.priceCategory)} sx={{ mr: 1, mb: 1 }} />
      <Chip label={gem.countryOfOrigin} sx={{ mb: 1 }} />
      <Box sx={{ mt: 2, mb: 2 }}>
        <Link href={gem.url} target="_blank" rel="noopener noreferrer">
          Visit Gem
        </Link>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button
          startIcon={<ThumbUpIcon />}
          onClick={() => handleVote(true)}
          sx={{ mr: 1 }}
        >
          Upvote ({gem.upvotes.toString()})
        </Button>
        <Button
          startIcon={<ThumbDownIcon />}
          onClick={() => handleVote(false)}
        >
          Downvote ({gem.downvotes.toString()})
        </Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        {gem.nftId ? (
          <Chip
            icon={<TokenIcon />}
            label={`NFT: ${gem.nftId.toString()}`}
            color="secondary"
            sx={{ mt: 1 }}
          />
        ) : (
          <Button
            startIcon={<TokenIcon />}
            onClick={handleCreateNFT}
            variant="contained"
            color="secondary"
            sx={{ mt: 1 }}
          >
            Create NFT
          </Button>
        )}
      </Box>
      <Typography variant="caption" display="block" sx={{ mt: 2 }}>
        Added on: {new Date(Number(gem.timestamp) / 1000000).toLocaleString()}
      </Typography>
    </Box>
  );
};

export default GemDetailsPage;
