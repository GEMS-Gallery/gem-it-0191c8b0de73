import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { backend } from '../../declarations/backend';
import { Box, Typography, Link, Button, CircularProgress, Chip } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

interface Gem {
  id: bigint;
  title: string;
  description: string | null;
  url: string;
  upvotes: bigint;
  downvotes: bigint;
  timestamp: bigint;
  category: { Brazil: null } | { Africa: null };
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

  const getCategoryName = (category: { Brazil: null } | { Africa: null }): string => {
    if ('Brazil' in category) return 'Brazil';
    if ('Africa' in category) return 'Africa';
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
      <Chip label={getCategoryName(gem.category)} color="primary" sx={{ mb: 2 }} />
      <Typography variant="body1" paragraph>
        {gem.description}
      </Typography>
      <Link href={gem.url} target="_blank" rel="noopener noreferrer">
        Visit Gem
      </Link>
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
      <Typography variant="caption" display="block" sx={{ mt: 2 }}>
        Added on: {new Date(Number(gem.timestamp) / 1000000).toLocaleString()}
      </Typography>
    </Box>
  );
};

export default GemDetailsPage;
