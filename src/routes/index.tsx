import DashboardPage from "@/(Admin)/dashboard";
import LayoutAdmin from "@/(Admin)/layout";
import ProductAdmin from "@/(Admin)/product/ProductAdmin";
import AddProductPage from "@/(Admin)/product/add/page";
import EditProductPage from "@/(Admin)/product/edit/page";
import { Route, Routes } from "react-router-dom";

const Router = () => {
    return <Routes>
        <Route path="/admin" element={<LayoutAdmin/>}>
            <Route index element={<DashboardPage/>}/>
            <Route path="products" element={<ProductAdmin/>}/>
            <Route path="products/add" element={<AddProductPage/>}/>
            <Route path="products/:id/edit" element={<EditProductPage/>}/>
            
        </Route>
    </Routes>;
};
export default Router;
