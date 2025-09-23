import { useState, useEffect } from 'react';
import { getTravelPlanDetailById } from "../apis/travelPlans";

const useTravelDetail = (id) => {
    const [travelDetail, setTravelDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        getTravelPlanDetailById(id)
            .then((response) => {
                setTravelDetail(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('获取数据失败:', error);
                setError(error);
                setLoading(false);
            });
    }, [id]);

    return { travelDetail, loading, error };
};

export default useTravelDetail;