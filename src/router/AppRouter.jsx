import { useCheckAuth } from '../hooks/useCheckAuth';
import { CheckingAuth } from '../ui/components/CheckingAuth';
import { Routes, Route, Navigate } from 'react-router-dom';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { AuthRoutes } from '../auth/routes/AuthRoutes';

export const AppRouter = () => {
    const { status } = useCheckAuth();

    if (status === 'checking') {
        return <CheckingAuth />;
    }

    return (
        <Routes>
            {status === 'authenticated' ? (
                <Route path='/*' element={<JournalRoutes />} />
            ) : (
                <Route path='/auth/*' element={<AuthRoutes />} />
            )}

            <Route path='/*' element={<Navigate to='/auth/login' />} />
            {/* Login y Registro */}
            {/* JournalApp */}
        </Routes>
    );
};
