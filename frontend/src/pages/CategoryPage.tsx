import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { backend } from '../../declarations/backend';
import { Grid, Card, CardContent, Typography, Button, CircularProgress, Chip } from '@mui/material';
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

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [gems, setGems] = useState<Gem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGemsByCategory();
  }, [category]);

  const fetchGemsByCategory = async () => {
    if (!category) return;
    try {
      const gemsData = await backend.getGemsByCategory(category);
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
      fetchGemsByCategory();
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        {category} Gems
      </Typography>
      <Grid container spacing={3}>
        {gems.map((gem) => (
          <Grid item xs={12} sm={6} md={4} key={gem.id.toString()}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {gem.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {gem.description}
                </Typography>
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CategoryPage;
