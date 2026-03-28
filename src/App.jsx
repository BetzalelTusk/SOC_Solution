import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  TextField,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  InputAdornment,
  Divider,
  Paper
} from '@mui/material';
import { Search, ShoppingCart, User, UploadCloud, ShieldAlert } from 'lucide-react';

// ==========================================
// 1. THEME & STYLING
// ==========================================
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2c3e50' },
    secondary: { main: '#e74c3c' },
    background: { default: '#f4f6f8', paper: '#ffffff' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// Mock Data
const MOCK_PRODUCTS = [
  { id: 1, name: "Enterprise Firewall Appliance", price: 2999.99, img: "https://placehold.co/400x200?text=Hardware+Appliance" },
  { id: 2, name: "SOC Analyst Coffee Mug", price: 14.99, img: "https://placehold.co/400x200?text=Coffee+Mug" },
  { id: 3, name: "Zero-Trust VPN License (1yr)", price: 199.00, img: "https://placehold.co/400x200?text=Software+License" },
];

// ==========================================
// 2. LAYOUT & NAVIGATION
// ==========================================
function Layout({ children }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // HONEYPOT: Directly pushing user input to URL parameters
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <ShieldAlert style={{ marginRight: '10px' }} />
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
            SecureTech Mock Store
          </Typography>

          <Box component="form" onSubmit={handleSearch} sx={{ mx: 2, display: 'flex', alignItems: 'center' }}>
            <TextField
              size="small"
              placeholder="Search products..."
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 1, input: { color: 'white' } }}
              InputProps={{
                endAdornment: <InputAdornment position="end"><Search color="white" size={20} /></InputAdornment>,
              }}
            />
          </Box>

          <Button color="inherit" component={Link} to="/cart" startIcon={<ShoppingCart size={20} />}>Cart</Button>
          <Button color="inherit" component={Link} to="/login" startIcon={<User size={20} />}>Sign In</Button>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Container>

      <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: '#fff', borderTop: '1px solid #e0e0e0', textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} SecureTech Mock Solutions. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

// ==========================================
// 3. PAGE COMPONENTS
// ==========================================

// --- Home Page ---
function Home() {
  return (
    <Box>
      <Paper sx={{ p: 6, mb: 4, textAlign: 'center', backgroundColor: '#34495e', color: 'white' }}>
        <Typography variant="h3" gutterBottom>Defend Your Digital Frontier</Typography>
        <Typography variant="h6" sx={{ opacity: 0.8 }}>Top-tier security appliances and swags for the modern SOC team.</Typography>
      </Paper>

      <Typography variant="h5" sx={{ mb: 3 }}>Featured Products</Typography>
      <Grid container spacing={4}>
        {MOCK_PRODUCTS.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia component="img" height="140" image={product.img} alt={product.name} />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">{product.name}</Typography>
                <Typography variant="h5" color="secondary">${product.price}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/product/${product.id}`}>View Details</Button>
                <Button size="small" variant="contained" color="primary">Add to Cart</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// --- Search Page (HONEYPOT: URL Params) ---
function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Search Results</Typography>
      {/* HONEYPOT: In a real app with a backend, this raw 'query' would be passed to the DB. 
        If the SOC is monitoring traffic, they will see malicious payloads here.
      */}
      <Typography variant="subtitle1" sx={{ mb: 4 }}>
        Showing results for: <strong>{query || "..."}</strong>
      </Typography>
      <Typography color="text.secondary">No matching products found. Try a different search term.</Typography>
    </Box>
  );
}

// --- Product Page (HONEYPOT: Unsanitized Inputs) ---
function ProductDetails() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <img src="https://placehold.co/600x400?text=Product+Image" alt="Product" style={{ width: '100%', borderRadius: '8px' }} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h3" gutterBottom>Enterprise Firewall Appliance</Typography>
        <Typography variant="h4" color="secondary" gutterBottom>$2999.99</Typography>
        <Typography variant="body1" paragraph>
          Next-generation firewall designed for high-throughput enterprise networks.
        </Typography>
        <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }}>Add to Cart</Button>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6" gutterBottom>Leave a Review</Typography>
        {/* HONEYPOT: A perfect target for XSS injection attempts by malicious agents */}
        <TextField fullWidth multiline rows={3} placeholder="Write your review here..." variant="outlined" sx={{ mb: 2 }} />
        <Button variant="outlined">Submit Review</Button>
      </Grid>
    </Grid>
  );
}

// --- User Dashboard (HONEYPOT: File Uploads) ---
function Dashboard() {
  return (
    <Box maxWidth="sm" mx="auto">
      <Typography variant="h4" gutterBottom>User Dashboard</Typography>
      <Paper sx={{ p: 4, mt: 3 }}>
        <Typography variant="h6" gutterBottom>Profile Information</Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>Email: admin@mockstore.local</Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>Update Profile Picture</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Upload a new avatar. (Max 2MB, JPG/PNG)
        </Typography>
        {/* HONEYPOT: Attackers will try to bypass filters and upload .php or .py reverse shells here */}
        <Button variant="contained" component="label" startIcon={<UploadCloud />}>
          Upload File
          <input type="file" hidden />
        </Button>
      </Paper>
    </Box>
  );
}

// --- Hidden Admin Portal (HONEYPOT: Scraper Target) ---
function AdminPortal() {
  return (
    <Box sx={{ textAlign: 'center', mt: 10 }}>
      <ShieldAlert size={64} color="red" />
      <Typography variant="h3" color="error" gutterBottom>STAFF PORTAL</Typography>
      <Typography variant="h6">
        Warning: Unauthorized access is strictly prohibited.
      </Typography>
      {/* HONEYPOT: This page is nowhere in the navigation. 
        If SOC sees traffic here, it's 100% a malicious agent running directory brute-forcing/scraping. 
      */}
      <Box mt={4} maxWidth="sm" mx="auto">
        <TextField fullWidth label="Staff ID" margin="normal" />
        <TextField fullWidth label="Passcode" type="password" margin="normal" />
        <Button fullWidth variant="contained" color="error" sx={{ mt: 2 }}>Access Backend</Button>
      </Box>
    </Box>
  );
}

// --- Auth Placeholder ---
function Login() {
  const navigate = useNavigate();
  return (
    <Box maxWidth="xs" mx="auto" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>Sign In</Typography>
        <TextField fullWidth label="Email Address" margin="normal" variant="outlined" />
        <TextField fullWidth label="Password" type="password" margin="normal" variant="outlined" />
        {/* Simulating login redirecting to dashboard */}
        <Button fullWidth variant="contained" color="primary" sx={{ mt: 3 }} onClick={() => navigate('/dashboard')}>
          Sign In
        </Button>
      </Paper>
    </Box>
  );
}

// ==========================================
// 4. MAIN APP ROUTER
// ==========================================
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* The hidden route */}
            <Route path="/staff-admin-portal" element={<AdminPortal />} />

            {/* Simple fallbacks for cart/checkout to complete the vibe */}
            <Route path="/cart" element={<Typography variant="h4">Shopping Cart (Empty)</Typography>} />
            <Route path="*" element={<Typography variant="h4">404 - Page Not Found</Typography>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}