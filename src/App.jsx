import React, { useState, useMemo } from 'react';
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
  Paper,
  IconButton,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Stepper,
  Step,
  StepLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Tab,
  Tabs,
  Drawer,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import {
  Search,
  ShoppingCart,
  User,
  UploadCloud,
  ShieldAlert,
  Menu,
  Facebook,
  Twitter,
  Instagram,
  Github,
  CreditCard,
  CheckCircle,
  Filter,
  Trash2,
  ChevronRight,
} from 'lucide-react';

// ==========================================
// 1. THEME & MOCK DATA
// ==========================================
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1a237e' }, // Deeper Blue for Professional Look
    secondary: { main: '#c62828' }, // Professional Red for Alerts/Actions
    background: { default: '#f8f9fa', paper: '#ffffff' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: { fontWeight: 800 },
    h4: { fontWeight: 700 },
    h6: { fontWeight: 600 },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600 },
      },
    },
  },
});

const MOCK_PRODUCTS = [
  { id: 1, name: "Enterprise Next-Gen Firewall", category: "Hardware", price: 4999.99, img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?auto=format&fit=crop&w=800&q=80", description: "Military-grade encryption and deep packet inspection." },
  { id: 2, name: "SOC Analyst Utility Pack", category: "Swag", price: 45.00, img: "https://images.unsplash.com/photo-1585822314491-fd8962411.jpeg?auto=format&fit=crop&w=800&q=80", description: "Includes a high-quality mug, lanyard, and stickers." },
  { id: 3, name: "Intrusion Detection System License", category: "Software", price: 899.00, img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80", description: "Anomalous traffic detection with real-time alerts." },
  { id: 4, name: "Secure Mobile Workstation", category: "Hardware", price: 2499.00, img: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80", description: "Hardened laptop with biometric security and hardware kill-switches." },
  { id: 5, name: "Endpoint Protection (100 Users)", category: "Software", price: 1200.00, img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80", description: "AI-driven endpoint detection and response." },
  { id: 6, name: "Custom Mechanical Keyboard", category: "Swag", price: 180.00, img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80", description: "RGB mechanical keyboard optimized for coding and security audits." },
  { id: 7, name: "Hardware Security Module (HSM)", category: "Hardware", price: 850.00, img: "https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&w=800&q=80", description: "Tamper-resistant cryptographic processor." },
  { id: 8, name: "Phishing Simulation Platform", category: "Software", price: 600.00, img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80", description: "Train your employees with realistic phishing scenarios." },
];

const CATEGORIES = ["All", "Hardware", "Software", "Swag"];

// ==========================================
// 2. LAYOUT & NAVIGATION
// ==========================================
function Layout({ children, cartCount }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // HONEYPOT: Reflective search. Malicious agents will try <script>alert(1)</script>
    navigate(`/search?q=${encodeURI(searchQuery)}`);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="sticky" color="primary" elevation={2} sx={{ py: 0.5 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <ShieldAlert size={32} style={{ marginRight: '12px', color: '#ffeb3b' }} />
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 900,
                letterSpacing: '-0.5px',
                display: { xs: 'none', sm: 'block' }
              }}
            >
              SECURETECH <Typography component="span" variant="h5" color="secondary" sx={{ fontWeight: 400 }}>SOLUTIONS</Typography>
            </Typography>

            <Box component="form" onSubmit={handleSearch} sx={{ mx: { xs: 1, md: 4 }, flexGrow: 1, maxWidth: 600 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search Security Gear..."
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': { borderColor: 'transparent' },
                    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                    '&.Mui-focused fieldset': { borderColor: 'white' },
                  }
                }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Search color="white" size={18} /></InputAdornment>,
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton color="inherit" component={Link} to="/cart">
                <Badge badgeContent={cartCount} color="secondary">
                  <ShoppingCart size={24} />
                </Badge>
              </IconButton>
              <IconButton color="inherit" component={Link} to="/login" sx={{ ml: 1 }}>
                <User size={24} />
              </IconButton>
              <IconButton color="inherit" sx={{ display: { xs: 'flex', md: 'none' }, ml: 1 }} onClick={() => setDrawerOpen(true)}>
                <Menu size={24} />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Main Menu</Typography>
          <List>
            <ListItem button component={Link} to="/" onClick={() => setDrawerOpen(false)}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/login" onClick={() => setDrawerOpen(false)}>
              <ListItemText primary="Account" />
            </ListItem>
            <ListItem button component={Link} to="/cart" onClick={() => setDrawerOpen(false)}>
              <ListItemText primary="My Cart" />
            </ListItem>
          </List>
          <Divider />
          <Typography variant="overline" sx={{ px: 2, mt: 2, display: 'block' }}>Categories</Typography>
          <List>
            {CATEGORIES.map(cat => (
              <ListItem button key={cat}>
                <ListItemText primary={cat} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      {/* ==========================================
          ROBUST FOOTER & NEWSLETTER
      ========================================== */}
      <Box component="footer" sx={{ bgcolor: '#1a237e', color: 'white', pt: 8, pb: 4, mt: 8 }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ShieldAlert size={28} style={{ marginRight: '8px', color: '#ffeb3b' }} />
                <Typography variant="h6" sx={{ fontWeight: 900 }}>SECURETECH</Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.7, mb: 3, maxWidth: 300 }}>
                The world's leading provider of military-grade security appliances, software, and SOC essentials. Built for defenders, by defenders.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <IconButton color="inherit"><Facebook size={20} /></IconButton>
                <IconButton color="inherit"><Twitter size={20} /></IconButton>
                <IconButton color="inherit"><Instagram size={20} /></IconButton>
                <IconButton color="inherit"><Github size={20} /></IconButton>
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="h6" gutterBottom>Quick Links</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link to="/" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.7 }}>About Us</Link>
                <Link to="/" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.7 }}>Contact Support</Link>
                <Link to="/" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.7 }}>Track Order</Link>
                <Link to="/" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.7 }}>Staff Portal</Link>
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="h6" gutterBottom>Legal</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link to="/" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.7 }}>Privacy Policy</Link>
                <Link to="/" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.7 }}>Terms of Service</Link>
                <Link to="/" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.7 }}>Cookie Settings</Link>
                <Link to="/" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.7 }}>EULA</Link>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>Newsletter Signup</Typography>
              <Typography variant="body2" sx={{ opacity: 0.7, mb: 2 }}>
                Get the latest vulnerability reports and hardware drops delivered to your inbox.
              </Typography>
              {/* HONEYPOT: Newsletter field. Targets for SQLi/XSS via email field */}
              <Box component="form" sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="email@example.com"
                  sx={{ bgcolor: 'white', borderRadius: 1 }}
                />
                <Button variant="contained" color="secondary">Subscribe</Button>
              </Box>
              <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.5 }}>
                We respect your privacy. No spam, only bytes.
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, bgcolor: 'rgba(255,255,255,0.1)' }} />
          <Typography variant="body2" color="inherit" align="center" sx={{ opacity: 0.5 }}>
            © {new Date().getFullYear()} SECURETECH SOLUTIONS INC. | ENTERPRISE GRADE PROTECTION
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

// ==========================================
// 3. PAGE COMPONENTS
// ==========================================

// --- Home Page ---
function Home({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: '#000', color: 'white', overflow: 'hidden', position: 'relative', py: { xs: 8, md: 15 } }}>
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Chip label="NEW ARRIVAL" color="secondary" sx={{ mb: 2, fontWeight: 700 }} />
              <Typography variant="h2" component="h1" gutterBottom sx={{ lineHeight: 1.1 }}>
                HARDEN YOUR <br /> <Typography component="span" variant="h2" color="secondary" sx={{ fontWeight: 900 }}>INFRASTRUCTURE</Typography>
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.8, maxWidth: 500 }}>
                Next-generation security appliances designed for the most demanding SOC environments.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" color="secondary" size="large" sx={{ px: 4, py: 1.5 }}>Shop Hardware</Button>
                <Button variant="outlined" color="inherit" size="large" sx={{ px: 4, py: 1.5 }}>View Catalog</Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80"
                sx={{ width: '100%', borderRadius: 4, boxShadow: '0 25px 50px -12px rgba(255, 0, 0, 0.25)' }}
              />
            </Grid>
          </Grid>
        </Container>
        {/* Decorative Grid */}
        <Box sx={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, opacity: 0.1, backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </Box>

      <Container maxWidth="xl" sx={{ mt: 8 }}>
        <Grid container spacing={4}>
          {/* Sidebar Filter */}
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 3, position: 'sticky', top: 100 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Filter size={18} style={{ marginRight: '8px' }} /> FILTERS
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Typography variant="subtitle2" gutterBottom>CATEGORY</Typography>
              <FormGroup sx={{ mb: 4 }}>
                {CATEGORIES.map(cat => (
                  <FormControlLabel
                    key={cat}
                    control={<Checkbox checked={activeCategory === cat} onChange={() => setActiveCategory(cat)} />}
                    label={cat}
                  />
                ))}
              </FormGroup>

              <Typography variant="subtitle2" gutterBottom>PRICE RANGE</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}><TextField size="small" placeholder="Min" type="number" /></Grid>
                <Grid item xs={6}><TextField size="small" placeholder="Max" type="number" /></Grid>
              </Grid>

              <Button fullWidth variant="contained" sx={{ mt: 4 }}>Apply Filters</Button>
            </Paper>
          </Grid>

          {/* Product Grid */}
          <Grid item xs={12} md={9}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Typography variant="h5">Catalog: {activeCategory}</Typography>
              <Typography variant="body2" sx={{ opacity: 0.6 }}>Showing {filteredProducts.length} results</Typography>
            </Box>

            <Grid container spacing={3}>
              {filteredProducts.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} lg={4}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: '0.3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: 10 } }}>
                    <CardMedia component="img" height="200" image={product.img} alt={product.name} />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="caption" color="secondary" sx={{ fontWeight: 700, letterSpacing: 1 }}>{product.category.toUpperCase()}</Typography>
                      <Typography gutterBottom variant="h6" sx={{ mt: 1 }}>{product.name}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{product.description}</Typography>
                      <Typography variant="h5" color="primary" sx={{ fontWeight: 800 }}>${product.price.toLocaleString()}</Typography>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button fullWidth variant="contained" color="primary" onClick={() => onAddToCart(product)}>Add to Cart</Button>
                      <IconButton component={Link} to={`/product/${product.id}`}><ChevronRight /></IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// --- Search Page (Refined HONEYPOT) ---
function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <Typography variant="h4" gutterBottom>Search Results</Typography>
      <Divider sx={{ mb: 4 }} />
      {/* HONEYPOT: Directly rendering URL parameter. If query is <img src=x onerror=alert(1)>, it pops. */}
      <Box sx={{ p: 4, bgcolor: '#eef2f6', borderRadius: 2, mb: 4 }}>
        <Typography variant="h6">
          Query matched 0 items for: <span dangerouslySetInnerHTML={{ __html: query || '""' }} />
        </Typography>
      </Box>

      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Search size={64} style={{ opacity: 0.1, marginBottom: '16px' }} />
        <Typography variant="h5" color="text.secondary">We couldn't find anything matching your search.</Typography>
        <Typography variant="body1" sx={{ mt: 1, opacity: 0.6 }}>Try checking your spelling or use more general keywords.</Typography>
        <Button variant="outlined" component={Link} to="/" sx={{ mt: 4 }}>Back to Home</Button>
      </Box>
    </Container>
  );
}

// --- Cart Page ---
function Cart({ cart, onRemove, onUpdateQuantity }) {
  const navigate = useNavigate();
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.0825;
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 15, textAlign: 'center' }}>
        <ShoppingCart size={80} style={{ opacity: 0.2, marginBottom: '24px' }} />
        <Typography variant="h4" gutterBottom>Your cart is empty.</Typography>
        <Typography variant="body1" sx={{ mb: 4, opacity: 0.6 }}>Looks like you haven't added any security gear yet.</Typography>
        <Button variant="contained" size="large" component={Link} to="/">Start Shopping</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 800 }}>Shopping Cart</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0' }}>
            <Table>
              <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar variant="rounded" src={item.img} />
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{item.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">${item.price.toLocaleString()}</TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        type="number"
                        value={item.quantity}
                        onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
                        sx={{ width: 60 }}
                        inputProps={{ min: 1 }}
                      />
                    </TableCell>
                    <TableCell align="right">${(item.price * item.quantity).toLocaleString()}</TableCell>
                    <TableCell align="right">
                      <IconButton color="error" onClick={() => onRemove(item.id)}><Trash2 size={18} /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, bgcolor: '#f8f9fa' }}>
            <Typography variant="h6" gutterBottom>Order Summary</Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
              <Typography color="text.secondary">Subtotal</Typography>
              <Typography sx={{ fontWeight: 600 }}>${subtotal.toLocaleString()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
              <Typography color="text.secondary">Est. Tax (8.25%)</Typography>
              <Typography sx={{ fontWeight: 600 }}>${tax.toLocaleString()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
              <Typography color="text.secondary">Shipping</Typography>
              <Typography sx={{ fontWeight: 600, color: 'green' }}>FREE</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>Total</Typography>
              <Typography variant="h5" color="primary" sx={{ fontWeight: 800 }}>${total.toLocaleString()}</Typography>
            </Box>

            {/* HONEYPOT: Coupon Code - reflected in result or used for injection simulation */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>HAVE A COUPON?</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField fullWidth size="small" placeholder="Enter Code" />
                <Button variant="outlined" size="small">Apply</Button>
              </Box>
            </Box>

            <Button fullWidth variant="contained" size="large" onClick={() => navigate('/checkout')}>Proceed to Checkout</Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

// --- Checkout Page (Multi-step) ---
function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Shipping', 'Payment', 'Review'];

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>Checkout Pipeline</Typography>
        <Stepper activeStep={activeStep} sx={{ mb: 6 }}>
          {steps.map((label) => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
        </Stepper>

        {activeStep === 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}><TextField fullWidth label="First Name" /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Last Name" /></Grid>
              <Grid item xs={12}><TextField fullWidth label="Address Line 1" /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="City" /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Zip Code" /></Grid>
            </Grid>
            <Box mt={4} display="flex" justifyContent="flex-end">
              <Button onClick={handleNext} variant="contained" color="secondary">Next Section</Button>
            </Box>
          </Box>
        )}

        {activeStep === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>Payment Method</Typography>
            <Box sx={{ p: 3, bgcolor: '#f0f0f0', borderRadius: 2, mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
              <CreditCard size={32} />
              <Typography>Secure Credit Card Transaction (Encrypted via SSL-X)</Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12}><TextField fullWidth label="Name on Card" /></Grid>
              <Grid item xs={12}><TextField fullWidth label="Card Number" /></Grid>
              <Grid item xs={6}><TextField fullWidth label="Expiry Date" placeholder="MM/YY" /></Grid>
              <Grid item xs={6}><TextField fullWidth label="CVV" /></Grid>
            </Grid>
            <Box mt={4} display="flex" justifyContent="space-between">
              <Button onClick={handleBack}>Back</Button>
              <Button onClick={handleNext} variant="contained" color="secondary">Review Order</Button>
            </Box>
          </Box>
        )}

        {activeStep === 2 && (
          <Box sx={{ textAlign: 'center' }}>
            <CheckCircle size={64} color="green" style={{ marginBottom: '16px' }} />
            <Typography variant="h5" gutterBottom>Ready to Secure your Gear?</Typography>
            <Typography variant="body1" paragraph>
              Your transaction is ready for final authorization. By clicking "Place Order", you agree to our Terms of Defense.
            </Typography>
            <Box mt={4} display="flex" justifyContent="space-between">
              <Button onClick={handleBack}>Back</Button>
              <Button variant="contained" color="primary" size="large" onClick={() => alert("Simulation: Order Placed!")}>Place Order</Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

// --- Dashboard ---
function Dashboard() {
  const [tabValue, setTabValue] = useState(0);

  const MOCK_ORDERS = [
    { id: "ORD-9912", date: "2026-03-15", status: "Delivered", total: 499.99 },
    { id: "ORD-8822", date: "2026-01-10", status: "Processing", total: 120.00 },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 800 }}>Account Portal</Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
          <Tab label="Recent Orders" />
          <Tab label="Security Settings" />
          <Tab label="Profile Info" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {MOCK_ORDERS.map((order) => (
                <TableRow key={order.id}>
                  <TableCell sx={{ fontWeight: 600 }}>{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell><Chip size="small" label={order.status} color={order.status === 'Delivered' ? 'success' : 'warning'} /></TableCell>
                  <TableCell align="right">${order.total}</TableCell>
                  <TableCell align="center"><Button size="small">Details</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {tabValue === 1 && (
        <Paper sx={{ p: 4, maxWidth: 600 }}>
          <Typography variant="h6" gutterBottom>Password & Security</Typography>
          <TextField fullWidth label="Current Password" type="password" sx={{ my: 2 }} />
          <TextField fullWidth label="New Password" type="password" sx={{ mb: 2 }} />
          <Button variant="contained">Update Security</Button>
          <Divider sx={{ my: 4 }} />
          <Typography variant="h6" gutterBottom>2FA Settings</Typography>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>Multi-factor authentication is currently enabled via Staff-Authenticator.</Typography>
        </Paper>
      )}

      {tabValue === 2 && (
        <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
          <Paper sx={{ p: 4, flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
              <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}>AD</Avatar>
              <Box>
                <Typography variant="h6">Administrator Account</Typography>
                <Typography variant="body2" color="text.secondary">Level 5 Security Clearance</Typography>
              </Box>
            </Box>
            <TextField fullWidth label="Display Name" defaultValue="Admin User" sx={{ mb: 2 }} />
            <TextField fullWidth label="Email" defaultValue="admin@securetech.local" disabled sx={{ mb: 4 }} />
            <Button variant="contained">Save Profile</Button>
          </Paper>

          <Paper sx={{ p: 4, flex: 1, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>Identity Verification</Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>Please upload a scan of your staff ID for identity verification.</Typography>
            {/* HONEYPOT: Malicious file upload. No validation. */}
            <Box sx={{ border: '2px dashed #ccc', py: 6, borderRadius: 2, bgcolor: '#fafafa' }}>
              <UploadCloud size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
              <Typography variant="body2" color="text.secondary">Drag & drop files here or</Typography>
              <Button component="label" sx={{ mt: 1 }}>
                Browse Files
                <input type="file" hidden />
              </Button>
            </Box>
            <Typography variant="caption" sx={{ mt: 2, display: 'block', opacity: 0.5 }}>Supported: PDF, JPG, PNG (Max 10MB)</Typography>
          </Paper>
        </Box>
      )}
    </Container>
  );
}

// ==========================================
// 4. MAIN APP ROUTER
// ==========================================
export default function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const handleRemove = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout cartCount={totalItems}>
          <Routes>
            <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/cart" element={<Cart cart={cart} onRemove={handleRemove} onUpdateQuantity={handleUpdateQuantity} />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Box maxWidth="xs" mx="auto" sx={{ py: 15 }}><Paper sx={{ p: 4, textAlign: 'center' }}><Typography variant="h5" gutterBottom>Sign In</Typography><TextField fullWidth label="Email" margin="normal" /><TextField fullWidth label="Password" type="password" margin="normal" /><Button fullWidth variant="contained" component={Link} to="/dashboard" sx={{ mt: 3 }}>Login</Button></Paper></Box>} />
            {/* The hidden route */}
            <Route path="/staff-admin-portal" element={<Box sx={{ textAlign: 'center', py: 20 }}><ShieldAlert size={100} color="red" /><Typography variant="h2">UNAUTHORIZED ACCESS</Typography><Typography>This event has been logged for SOC review.</Typography></Box>} />
            <Route path="*" element={<Typography variant="h4" align="center" sx={{ py: 20 }}>404 - Breach Protocol Initiated</Typography>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}