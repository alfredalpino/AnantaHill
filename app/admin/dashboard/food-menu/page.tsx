'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import CRMTable from '@/components/admin/CRMTable';
import FoodModal from '@/components/admin/FoodModal';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';
import { motion } from 'framer-motion';

export default function AdminFoodMenuPage() {
    const [foodData, setFoodData] = useState<Record<string, any>[]>([]);
    const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);
    const [editingFoodId, setEditingFoodId] = useState<string | number | null>(null);
    const [foodToDelete, setFoodToDelete] = useState<string | number | null>(null);
    const [newFoodData, setNewFoodData] = useState({ name: '', category: 'Main Course', price: '', description: '', isAvailable: true, image: '' });
    const [isLoadingFood, setIsLoadingFood] = useState(true);
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState<'all' | 'live' | 'hidden'>('all');

    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 3000);
    };

    useEffect(() => {
        // Mock data
        setTimeout(() => {
            setFoodData([
                { id: '1', name: 'Paneer Tikka', category: 'Starter', price: '350', description: 'Grilled cottage cheese', isAvailable: true, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=400' },
                { id: '2', name: 'Dal Makhani', category: 'Main Course', price: '450', description: 'Creamy black lentils', isAvailable: true, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=400' },
                { id: '3', name: 'Butter Naan', category: 'Main Course', price: '60', description: 'Tandoori bread with butter', isAvailable: true, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400' },
                { id: '4', name: 'Secret Dish', category: 'Chef Special', price: '0', description: 'Hidden dish', isAvailable: false, image: '' },
            ]);
            setIsLoadingFood(false);
        }, 800);
    }, []);

    const filteredData = useMemo(() => {
        if (activeTab === 'all') return foodData;
        if (activeTab === 'live') return foodData.filter(f => Number(f.price) > 0);
        return foodData.filter(f => Number(f.price) <= 0);
    }, [foodData, activeTab]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setNewFoodData(prev => ({ ...prev, image: URL.createObjectURL(file) }));
            showNotification('success', 'Image uploaded successfully');
        } catch (error) {
            console.error('Error uploading image:', error);
            showNotification('error', 'Failed to upload image');
        } finally {
            setUploadingImage(false);
        }
    };

    const handleAddFood = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            showNotification('success', editingFoodId ? 'Food item updated' : 'Food item added');
            setIsAddFoodOpen(false);
            setNewFoodData({ name: '', category: 'Main Course', price: '', description: '', isAvailable: true, image: '' });
            setEditingFoodId(null);
            // Refresh logic here
        } catch (err) {
            showNotification('error', 'Failed to save food item');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteFood = (id: string | number) => setFoodToDelete(id);

    const confirmDeleteFood = async () => {
        if (!foodToDelete) return;
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            showNotification('success', 'Food item deleted successfully');
            setFoodToDelete(null);
        } catch (err) {
            showNotification('error', 'Failed to delete food item');
        }
    };

    const openEditFoodModal = (food: Record<string, any>) => {
        setEditingFoodId(food.id);
        setNewFoodData({
            name: food.name || '',
            category: food.category || 'Main Course',
            price: food.price || '',
            description: food.description || '',
            isAvailable: food.isAvailable !== false,
            image: food.image || ''
        });
        setIsAddFoodOpen(true);
    };

    const openAddFoodModal = () => {
        setEditingFoodId(null);
        setNewFoodData({ name: '', category: 'Main Course', price: '', description: '', isAvailable: true, image: '' });
        setIsAddFoodOpen(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 relative"
        >
            {notification && (
                <div className={`fixed bottom-4 right-4 p-4 rounded-xl shadow-lg z-50 border font-bold text-xs ${
                    notification.type === 'success' ? 'bg-success/10 border-success text-success' : 'bg-error/10 border-error text-error'
                }`}>
                    {notification.message}
                </div>
            )}

            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-text-primary">Menu Management</h2>
                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-1">Configure restaurant items and pricing</p>
                </div>
                <button onClick={openAddFoodModal} className="btn-primary px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                    + Add Item
                </button>
            </div>

            <div className="flex flex-wrap gap-2">
                {(['all', 'live', 'hidden'] as const).map((tab) => (
                    <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors border ${
                            activeTab === tab
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-text-muted border-secondary hover:bg-secondary/20'
                        }`}
                    >
                        {tab === 'hidden' ? 'Hidden Items' : tab.charAt(0).toUpperCase() + tab.slice(1)} ({
                            tab === 'all' ? foodData.length : 
                            tab === 'live' ? foodData.filter(f => Number(f.price) > 0).length : 
                            foodData.filter(f => Number(f.price) <= 0).length
                        })
                    </button>
                ))}
            </div>

            <CRMTable
                title={`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Menu Items`}
                isLoading={isLoadingFood}
                data={filteredData}
                columns={[
                    {
                        header: 'Image',
                        key: 'image',
                        render: (val) => (val as string) ? (
                            <div className="relative h-10 w-16 rounded-md overflow-hidden border border-secondary shadow-sm">
                                <Image
                                    src={val as string}
                                    alt="Food item"
                                    fill
                                    unoptimized={String(val).startsWith('http') || String(val).startsWith('blob:')}
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="w-16 h-10 bg-secondary/30 rounded-md flex items-center justify-center text-[8px] text-text-muted border border-secondary font-bold uppercase">No Img</div>
                        ),
                    },
                    { header: 'Item Name', key: 'name' },
                    { header: 'Category', key: 'category' },
                    { header: 'Price', key: 'price', render: (val) => `₹${val as string | number}` },
                    { 
                        header: 'Availability', 
                        key: 'isAvailable', 
                        render: (val) => (val as boolean) ? 
                        <span className="text-primary font-bold text-[10px] uppercase">Available</span> : 
                        <span className="text-error font-bold text-[10px] uppercase">Out of Stock</span> 
                    },
                    {
                        header: 'Actions',
                        key: 'actions',
                        render: (_, row) => (
                            <div className="flex gap-4 items-center">
                                <button type="button" onClick={() => openEditFoodModal(row)} className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">
                                    Edit
                                </button>
                                <button type="button" onClick={() => handleDeleteFood(row.id)} className="text-[10px] font-bold text-error uppercase tracking-widest hover:underline">
                                    Delete
                                </button>
                            </div>
                        )
                    }
                ]}
                hideDefaultActions
                hideExportAction
            />

            <FoodModal
                isOpen={isAddFoodOpen}
                onClose={() => setIsAddFoodOpen(false)}
                onSubmit={handleAddFood}
                editingFoodId={editingFoodId}
                newFoodData={newFoodData}
                setNewFoodData={setNewFoodData}
                uploadingImage={uploadingImage}
                isSubmitting={isSubmitting}
                onImageUpload={handleImageUpload}
            />

            <DeleteConfirmModal
                isOpen={!!foodToDelete}
                onClose={() => setFoodToDelete(null)}
                onConfirm={confirmDeleteFood}
                title="Delete Menu Item"
                message="Are you sure you want to delete this item? This action cannot be undone."
            />
        </motion.div>
    );
}
