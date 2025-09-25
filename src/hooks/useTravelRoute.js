import { useState, useEffect } from 'react';
import { getTravelPlanById } from "../apis/travelRoutes";

const useTravelRoute = (id) => {
    const [routeData, setRouteData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        getTravelPlanById(id)
            .then((response) => {
                setRouteData(response);
                setLoading(false);
            })
            .catch((error) => {
                console.error('获取路线数据失败:', error);
                setError(error);
                setLoading(false);
            });
    }, [id]);

    return { routeData, loading, error };
};

export default useTravelRoute;
