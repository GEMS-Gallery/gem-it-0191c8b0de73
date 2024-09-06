import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { backend } from '../../declarations/backend';
import { Grid, Card, CardContent, Typography, Button, CircularProgress, Chip, CardMedia } from '@mui/material';
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

const HomePage: React.FC = () => {
  const [gems, setGems] = useState<Gem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGems();
  }, []);

  const fetchGems = async () => {
    try {
      const gemsData = await backend.getGems();
      setGems(gemsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching gems:', error);
      setLoading(false);
    }
  };

  const handleVote = async (id: bigint, isUpvote: boolean) => {
    try {
      if (isUpvote) {
        await backend.upvoteGem(id);
      } else {
        await backend.downvoteGem(id);
      }
      fetchGems();
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const handleCreateNFT = async (id: bigint) => {
    try {
      const result = await backend.createNFT(id);
      if ('ok' in result) {
        console.log('NFT created with ID:', result.ok);
        fetchGems();
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

  return (
    <Grid container spacing={3}>
      {gems.map((gem) => (
        <Grid item xs={12} sm={6} md={4} key={gem.id.toString()}>
          <Card>
            {gem.imageUrl && (
              <CardMedia
                component="img"
                height="140"
                image={gem.imageUrl}
                alt={gem.title}
              />
            )}
            <CardContent>
              <Typography variant="h6" component="div">
                {gem.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {gem.description}
              </Typography>
              <Chip label={getCategoryName(gem.category)} color="primary" size="small" sx={{ mt: 1, mb: 1, mr: 1 }} />
              <Chip label={gem.color} size="small" sx={{ mt: 1, mb: 1, mr: 1 }} />
              <Chip label={getPriceCategoryName(gem.priceCategory)} size="small" sx={{ mt: 1, mb: 1, mr: 1 }} />
              <Chip label={gem.countryOfOrigin} size="small" sx={{ mt: 1, mb: 1 }} />
              <Button
                size="small"
                color="primary"
                component={RouterLink}
                to={`/gem/${gem.id.toString()}`}
              >
                View Details
              </Button>
              <Button
                size="small"
                startIcon={<ThumbUpIcon />}
                onClick={() => handleVote(gem.id, true)}
              >
                {gem.upvotes.toString()}
              </Button>
              <Button
                size="small"
                startIcon={<ThumbDownIcon />}
                onClick={() => handleVote(gem.id, false)}
              >
                {gem.downvotes.toString()}
              </Button>
              {gem.nftId ? (
                <Chip
                  icon={<TokenIcon />}
                  label={`NFT: ${gem.nftId.toString()}`}
                  color="secondary"
                  size="small"
                  sx={{ mt: 1 }}
                />
              ) : (
                <Button
                  size="small"
                  startIcon={<TokenIcon />}
                  onClick={() => handleCreateNFT(gem.id)}
                  sx={{ mt: 1 }}
                >
                  Create NFT
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default HomePage;
