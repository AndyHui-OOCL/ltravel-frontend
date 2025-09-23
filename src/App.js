import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import MainLayout from './layouts/MainLayout';
import Homepage from './pages/Homepage';
import LTravelDetail from './pages/LTravelDetail';
import './App.css';
import GuideRoute from "./pages/GuideRoute";
import GuideReviews from "./pages/GuideReviews";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#52c41a',
        },
      }}
    >
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/travel-plans/detail/:id" element={<LTravelDetail />} />
            <Route path="/guide-route/:id" element={<GuideRoute/>} />
            <Route path="/guide-review/:id" element={<GuideReviews />} />
            <Route path="/favorite" element={<div>Favorite Page</div>} />
            <Route path="/itinerary" element={<div>My Itinerary Page</div>} />
          </Routes>
        </MainLayout>
      </Router>
    </ConfigProvider>
  );
}

export default App;
