import { Box, Skeleton, Container, Typography } from '@mui/material';

export default function CartSkeleton() {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        <Skeleton width={200} />
      </Typography>

      {[1, 2, 3].map((_, i) => (
        <Box
          key={i}
          sx={{
            mb: 2,
            p: 2,
            borderRadius: 2,
            boxShadow: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Box sx={{ flex: 1, mr: 2 }}>
            <Skeleton variant="text" width="60%" height={30} />
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="50%" />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Skeleton variant="circular" width={36} height={36} sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" width={36} height={36} />
          </Box>
        </Box>
      ))}

      <Box sx={{ mt: 3 }}>
        <Skeleton variant="text" width="40%" height={30} sx={{ ml: 'auto' }} />
        <Skeleton variant="rectangular" height={40} sx={{ mt: 2, borderRadius: 1 }} />
      </Box>
    </Container>
  );
}
