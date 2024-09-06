import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { backend } from '../../declarations/backend';
import { TextField, Button, Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface FormData {
  title: string;
  description: string;
  url: string;
  category: string;
}

const AddGemPage: React.FC = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const result = await backend.addGem(data.title, [data.description], data.url, data.category);
      if ('ok' in result) {
        navigate('/');
      } else {
        console.error('Error adding gem:', result.err);
      }
    } catch (error) {
      console.error('Error adding gem:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Add New Gem
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          rules={{ required: 'Title is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Title"
              fullWidth
              margin="normal"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
          )}
        />
        <Controller
          name="url"
          control={control}
          defaultValue=""
          rules={{ required: 'URL is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="URL"
              fullWidth
              margin="normal"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="category"
          control={control}
          defaultValue=""
          rules={{ required: 'Category is required' }}
          render={({ field }) => (
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select {...field} label="Category">
                <MenuItem value="Brazil">Brazil</MenuItem>
                <MenuItem value="Africa">Africa</MenuItem>
              </Select>
            </FormControl>
          )}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Add Gem
        </Button>
      </form>
    </Box>
  );
};

export default AddGemPage;
