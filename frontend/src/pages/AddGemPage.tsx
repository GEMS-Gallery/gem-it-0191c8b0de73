import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { backend } from '../../declarations/backend';
import { TextField, Button, Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface FormData {
  title: string;
  description: string;
  url: string;
  category: string;
  color: string;
  priceCategory: string;
  countryOfOrigin: string;
  imageUrl: string;
}

const AddGemPage: React.FC = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<FormData>();
  const [imageUrl, setImageUrl] = useState<string>('');

  const onSubmit = async (data: FormData) => {
    try {
      const result = await backend.addGem(
        data.title,
        [data.description],
        data.url,
        data.category,
        data.color,
        data.priceCategory,
        data.countryOfOrigin,
        [imageUrl]
      );
      if ('ok' in result) {
        navigate('/');
      } else {
        console.error('Error adding gem:', result.err);
      }
    } catch (error) {
      console.error('Error adding gem:', error);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
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
        <Controller
          name="color"
          control={control}
          defaultValue=""
          rules={{ required: 'Color is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Color"
              fullWidth
              margin="normal"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="priceCategory"
          control={control}
          defaultValue=""
          rules={{ required: 'Price Category is required' }}
          render={({ field }) => (
            <FormControl fullWidth margin="normal">
              <InputLabel>Price Category</InputLabel>
              <Select {...field} label="Price Category">
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name="countryOfOrigin"
          control={control}
          defaultValue=""
          rules={{ required: 'Country of Origin is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Country of Origin"
              fullWidth
              margin="normal"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          onChange={handleImageUpload}
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span" sx={{ mt: 2, mb: 2 }}>
            Upload Image
          </Button>
        </label>
        {imageUrl && (
          <Box sx={{ mt: 2, mb: 2 }}>
            <img src={imageUrl} alt="Uploaded gem" style={{ maxWidth: '100%', maxHeight: '200px' }} />
          </Box>
        )}
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Add Gem
        </Button>
      </form>
    </Box>
  );
};

export default AddGemPage;
