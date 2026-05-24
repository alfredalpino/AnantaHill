'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { XCircle, UploadCloud, X } from 'lucide-react';
import { useToast } from '@/components/Toast';

export interface RoomFormData {
    name: string;
    type: string;
    capacity: number;
    basePrice: string;
    description: string;
    isAvailable: boolean;
    images: string[];
    totalRooms: number;
}

interface RoomFormProps {
    initialData?: RoomFormData;
    onSubmit: (data: RoomFormData) => Promise<void>;
    isSubmitting: boolean;
}

const DEFAULT_DATA: RoomFormData = {
    name: '',
    type: 'Villas',
    capacity: 2,
    basePrice: '',
    description: '',
    isAvailable: true,
    images: [],
    totalRooms: 1
};

export default function RoomForm({ initialData, onSubmit, isSubmitting }: RoomFormProps) {
    const [formData, setFormData] = useState<RoomFormData>(initialData || DEFAULT_DATA);
    const [uploadingImage, setUploadingImage] = useState(false);
    const { showToast } = useToast();

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        if (formData.images.length + files.length > 8) {
            showToast('Maximum 8 images allowed.', 'error');
            return;
        }

        setUploadingImage(true);
        try {
            // Mock upload logic for now
            await new Promise(resolve => setTimeout(resolve, 1000));
            const uploadedUrls = files.map(file => URL.createObjectURL(file));
            
            setFormData(prev => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
            showToast('Images uploaded successfully!', 'success');
        } catch (error) {
            console.error('Error uploading images:', error);
            showToast('Failed to upload image.', 'error');
        } finally {
            setUploadingImage(false);
            e.target.value = ''; // Reset input
        }
    };

    const handleRemoveImage = (urlToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter(img => img !== urlToRemove)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl border border-secondary shadow-premium">
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-2">Display Name (Website)</label>
                        <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 bg-white border border-secondary rounded-xl text-sm font-bold focus:outline-none focus:border-primary transition-all shadow-sm" placeholder="e.g. King’s Court Villa" />
                        <p className="text-[10px] text-text-muted mt-1 font-medium italic">This name is used only for display on the website.</p>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-2 flex items-center gap-2">
                            Type 
                            {initialData && <span className="bg-primary/10 text-primary-dark px-1.5 py-0.5 rounded text-[8px] border border-primary/20">SYNCED</span>}
                        </label>
                        {initialData ? (
                            <input type="text" disabled value={formData.type} className="w-full px-4 py-3 bg-secondary/20 border border-secondary rounded-xl text-sm font-bold text-primary-dark cursor-not-allowed opacity-80" />
                        ) : (
                            <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-3 bg-secondary/20 border border-secondary rounded-xl text-sm font-medium focus:outline-none focus:border-primary transition-all">
                                <option value="Villas">Villas</option>
                                <option value="Suites">Suites</option>
                                <option value="Cottages">Cottages</option>
                                <option value="Unique">Unique Stays</option>
                            </select>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-2 flex items-center gap-2">
                            Capacity (Max Guests)
                            {initialData && <span className="bg-primary/10 text-primary-dark px-1.5 py-0.5 rounded text-[8px] border border-primary/20">SYNCED</span>}
                        </label>
                        <input type="number" required min="1" value={formData.capacity} onChange={e => setFormData({ ...formData, capacity: Number(e.target.value) })} className="w-full px-4 py-3 bg-white border border-secondary rounded-xl text-sm font-bold focus:outline-none focus:border-primary transition-all shadow-sm" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-2 flex items-center gap-2">
                            Base Price (₹)
                            {initialData && <span className="bg-primary/10 text-primary-dark px-1.5 py-0.5 rounded text-[8px] border border-primary/20">SYNCED</span>}
                        </label>
                        <input type="number" disabled={!!initialData} required min="0" step="0.01" value={formData.basePrice} onChange={e => setFormData({ ...formData, basePrice: e.target.value })} className="w-full px-4 py-3 bg-secondary/20 border border-secondary rounded-xl text-sm font-medium focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed" placeholder="2500.00" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-2 flex items-center gap-2">
                            Total Inventory
                            {initialData && <span className="bg-primary/10 text-primary-dark px-1.5 py-0.5 rounded text-[8px] border border-primary/20">SYNCED</span>}
                        </label>
                        <input type="number" disabled={!!initialData} required min="1" value={formData.totalRooms} onChange={e => setFormData({ ...formData, totalRooms: Number(e.target.value) })} className="w-full px-4 py-3 bg-secondary/20 border border-secondary rounded-xl text-sm font-medium focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed" />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-2">Availability Status</label>
                    <select value={formData.isAvailable ? 'true' : 'false'} onChange={e => setFormData({ ...formData, isAvailable: e.target.value === 'true' })} className="w-full px-4 py-3 bg-secondary/20 border border-secondary rounded-xl text-sm font-medium focus:outline-none focus:border-primary transition-all">
                        <option value="true">Available / Active</option>
                        <option value="false">Booked / Under Maintenance</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-2">Description</label>
                    <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-3 bg-secondary/20 border border-secondary rounded-xl text-sm font-medium focus:outline-none focus:border-primary transition-all" placeholder="Room details..." rows={4}></textarea>
                </div>

                {/* Multiple Image Upload Component */}
                <div className="space-y-4 border-t border-secondary pt-6 mt-6">
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-xs font-bold text-text-muted uppercase tracking-widest">
                            Room Photos (Up to 8)
                        </label>
                        <span className="text-xs font-medium text-text-muted">{formData.images.length}/8 uploaded</span>
                    </div>

                    <div className="flex flex-wrap gap-4 items-start">
                        {formData.images.map((url, i) => (
                            <div key={i} className="relative group w-32 h-24 rounded-xl overflow-hidden shadow-sm border border-secondary">
                                <Image
                                    src={url}
                                    alt={`Upload ${i + 1}`}
                                    fill
                                    sizes="128px"
                                    unoptimized={url.startsWith('http') || url.startsWith('blob:')}
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button 
                                        type="button" 
                                        onClick={() => handleRemoveImage(url)}
                                        aria-label={`Remove uploaded image ${i + 1}`}
                                        className="p-2 bg-error text-white rounded-full hover:scale-110 transition-transform shadow-md"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {formData.images.length < 8 && (
                            <label className={`w-32 h-24 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors ${uploadingImage ? 'border-primary/50 bg-primary/5' : 'border-secondary hover:border-primary hover:bg-secondary/20'}`}>
                                <UploadCloud className={`w-6 h-6 mb-1 ${uploadingImage ? 'text-primary animate-pulse' : 'text-text-muted'}`} />
                                <span className="text-[10px] uppercase font-bold text-text-muted tracking-wide">
                                    {uploadingImage ? 'Uploading...' : 'Add Photos'}
                                </span>
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    multiple 
                                    onChange={handleImageUpload} 
                                    disabled={uploadingImage} 
                                    className="hidden" 
                                />
                            </label>
                        )}
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-secondary text-right">
                <button type="submit" disabled={uploadingImage || isSubmitting} className="btn-primary px-10 py-3 disabled:opacity-50 flex items-center justify-center gap-2 text-sm ml-auto">
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                        </>
                    ) : (
                        initialData ? 'Update Room Configuration' : 'Create Room Entry'
                    )}
                </button>
            </div>
        </form>
    );
}
