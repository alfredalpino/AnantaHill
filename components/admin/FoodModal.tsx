'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { XCircle } from 'lucide-react';

interface FoodModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    editingFoodId: string | number | null;
    newFoodData: {
        name: string;
        category: string;
        price: string;
        description: string;
        isAvailable: boolean;
        image: string;
    };
    setNewFoodData: React.Dispatch<React.SetStateAction<{
        name: string;
        category: string;
        price: string;
        description: string;
        isAvailable: boolean;
        image: string;
    }>>;
    uploadingImage: boolean;
    isSubmitting: boolean;
    onImageUpload: (e: React.ChangeEvent<HTMLInputElement>, type: 'room' | 'food') => void;
}

export default function FoodModal({
    isOpen,
    onClose,
    onSubmit,
    editingFoodId,
    newFoodData,
    setNewFoodData,
    uploadingImage,
    isSubmitting,
    onImageUpload
}: FoodModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-accent/60 backdrop-blur-sm" onClick={onClose} />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative bg-white rounded-2xl w-full max-w-md p-6 border border-secondary shadow-xl overflow-hidden shadow-luxury"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-display font-bold text-text-primary">{editingFoodId ? 'Edit Food Item' : 'Add Food Item'}</h3>
                            <button type="button" onClick={onClose} aria-label="Close food form" className="p-1.5 hover:bg-secondary/30 rounded-lg transition-all">
                                <XCircle className="w-5 h-5 text-text-muted" />
                            </button>
                        </div>
                        <form onSubmit={onSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Item Name</label>
                                <input type="text" required value={newFoodData.name} onChange={e => setNewFoodData({ ...newFoodData, name: e.target.value })} className="w-full px-4 py-2 bg-secondary/20 border border-secondary rounded-xl text-sm font-medium focus:outline-none focus:border-primary transition-all" placeholder="e.g. Paneer Tikka" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Category</label>
                                    <select value={newFoodData.category} onChange={e => setNewFoodData({ ...newFoodData, category: e.target.value })} className="w-full px-4 py-2 bg-secondary/20 border border-secondary rounded-xl text-sm font-medium focus:outline-none focus:border-primary transition-all">
                                        <option>Starter</option>
                                        <option>Main Course</option>
                                        <option>Dessert</option>
                                        <option>Beverage</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Base Price (₹)</label>
                                    <input type="number" required min="0" step="0.01" value={newFoodData.price} onChange={e => setNewFoodData({ ...newFoodData, price: e.target.value })} className="w-full px-4 py-2 bg-secondary/20 border border-secondary rounded-xl text-sm font-medium focus:outline-none focus:border-primary transition-all" placeholder="300.00" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Availability</label>
                                <select value={newFoodData.isAvailable ? 'true' : 'false'} onChange={e => setNewFoodData({ ...newFoodData, isAvailable: e.target.value === 'true' })} className="w-full px-4 py-2 bg-secondary/20 border border-secondary rounded-xl text-sm font-medium focus:outline-none focus:border-primary transition-all">
                                    <option value="true">Available</option>
                                    <option value="false">Out of Stock</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Menu Image</label>
                                <div className="flex gap-4 items-center">
                                    {newFoodData.image ? (
                                        <div className="relative h-14 w-20 rounded-md overflow-hidden border border-secondary shadow-sm">
                                            <Image
                                                src={newFoodData.image}
                                                alt="Food preview"
                                                fill
                                                unoptimized={newFoodData.image.startsWith('http')}
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-20 h-14 bg-secondary/30 rounded-md flex items-center justify-center text-[10px] text-text-muted border border-secondary font-bold uppercase">Empty</div>
                                    )}
                                    <div className="flex-1">
                                        <input type="file" accept="image/*" onChange={(e) => onImageUpload(e, 'food')} disabled={uploadingImage} className="w-full px-4 py-2 bg-secondary/20 border border-secondary rounded-xl text-xs font-medium focus:outline-none focus:border-primary transition-all file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:bg-primary/20 file:text-primary-dark hover:file:bg-primary/30 cursor-pointer" />
                                    </div>
                                </div>
                                {uploadingImage && <p className="text-[10px] text-primary-dark mt-2 font-bold uppercase tracking-widest animate-pulse">Uploading Image...</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Description</label>
                                <textarea value={newFoodData.description} onChange={e => setNewFoodData({ ...newFoodData, description: e.target.value })} className="w-full px-4 py-2 bg-secondary/20 border border-secondary rounded-xl text-sm font-medium focus:outline-none focus:border-primary transition-all" placeholder="Item details..." rows={3}></textarea>
                            </div>
                            <button type="submit" disabled={uploadingImage || isSubmitting} className="w-full py-3 bg-accent text-white font-bold rounded-xl transition-all hover:bg-primary-dark active:scale-95 disabled:opacity-50 disabled:hover:scale-100 flex justify-center items-center gap-2">
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Submitting...
                                    </>
                                ) : (
                                    editingFoodId ? 'Save Changes' : 'Save Food Item'
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
