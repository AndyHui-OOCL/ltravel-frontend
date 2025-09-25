import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {SearchProvider} from './contexts/SearchContext';
import MainLayout from './layouts/MainLayout';
import Homepage from './pages/Homepage';
import FavoritePage from './pages/FavoritePage';
import LTravelDetail from './pages/LTravelDetail';
import GuideRoute from './pages/GuideRoute';
import GuideReviews from './pages/GuideReviews';

function App() {
  return (
    <SearchProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/favorite" element={<FavoritePage />} />
            <Route path="/travel-plans/detail/:id" element={<LTravelDetail />} />
            <Route path="/travel-plans/:id/route" element={<GuideRoute />} />
            <Route path="/travel-plans/:id/reviews" element={<GuideReviews />} />
          </Routes>
        </MainLayout>
      </Router>
    </SearchProvider>
  );
}

export default App;
