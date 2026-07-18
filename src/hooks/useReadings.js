import { useState, useEffect, useMemo } from 'react';
import { readingsService } from '../services/readingsService';

export function useReadings() {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [error, setError] = useState(null);

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReading, setEditingReading] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    type: 'manga',
    status: 'reading',
    current_chapter: 0,
    total_chapters: '',
    rating: '',
    cover_url: '',
    notes: ''
  });

  const fetchReadings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await readingsService.getReadings();
      setReadings(data);
    } catch (err) {
      console.error('Error fetching readings:', err);
      setError('No se pudieron cargar las lecturas. Verifica tu conexión y la base de datos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReadings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openAddModal = () => {
    setEditingReading(null);
    setFormData({
      title: '',
      type: 'manga',
      status: 'reading',
      current_chapter: 0,
      total_chapters: '',
      rating: '',
      cover_url: '',
      notes: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (reading) => {
    setEditingReading(reading);
    setFormData({
      title: reading.title,
      type: reading.type,
      status: reading.status,
      current_chapter: reading.current_chapter,
      total_chapters: reading.total_chapters || '',
      rating: reading.rating || '',
      cover_url: reading.cover_url || '',
      notes: reading.notes || ''
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveReading = async (e) => {
    if (e) e.preventDefault();
    
    try {
      setError(null);
      const payload = {
        title: formData.title,
        type: formData.type,
        status: formData.status,
        current_chapter: parseInt(formData.current_chapter, 10) || 0,
        total_chapters: formData.total_chapters ? parseInt(formData.total_chapters, 10) : null,
        rating: formData.rating ? parseInt(formData.rating, 10) : null,
        cover_url: formData.cover_url || null,
        notes: formData.notes || null
      };

      if (editingReading) {
        await readingsService.updateReading(editingReading.id, payload);
      } else {
        await readingsService.createReading(payload);
      }

      setIsModalOpen(false);
      fetchReadings();
    } catch (err) {
      console.error('Error saving reading:', err);
      setError('Error al guardar la lectura. Por favor intenta de nuevo.');
    }
  };

  const deleteReading = async (id, title) => {
    if (!window.confirm(`¿Estás seguro de que quieres eliminar "${title}"?`)) return;
    
    try {
      setError(null);
      await readingsService.deleteReading(id);
      setReadings(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error('Error deleting reading:', err);
      setError('Error al eliminar la lectura.');
    }
  };

  const incrementChapter = async (id, currentVal, totalVal) => {
    if (totalVal && currentVal >= totalVal) return;

    const newVal = currentVal + 1;

    // Optimistic UI Update
    setReadings(prev => prev.map(item => 
      item.id === id ? { ...item, current_chapter: newVal, updated_at: new Date().toISOString() } : item
    ));

    try {
      await readingsService.incrementReadingChapter(id, currentVal);
    } catch (err) {
      console.error('Error incrementing chapter:', err);
      // Rollback on error
      fetchReadings();
    }
  };

  // Memoized calculations for dashboard
  const stats = useMemo(() => {
    const totalTitles = readings.length;
    const totalChapters = readings.reduce((acc, curr) => acc + curr.current_chapter, 0);
    const completedTitles = readings.filter(item => item.status === 'completed').length;
    const readingTitles = readings.filter(item => item.status === 'reading').length;
    
    const typeCounts = readings.reduce((acc, curr) => {
      acc[curr.type] = (acc[curr.type] || 0) + 1;
      return acc;
    }, { manga: 0, manhwa: 0, manhua: 0 });

    return {
      totalTitles,
      totalChapters,
      completedTitles,
      readingTitles,
      typeCounts
    };
  }, [readings]);

  // Memoized filtered readings
  const filteredReadings = useMemo(() => {
    return readings.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            (item.notes && item.notes.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesType = filterType === 'all' ? true : item.type === filterType;
      const matchesStatus = filterStatus === 'all' ? true : item.status === filterStatus;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [readings, searchTerm, filterType, filterStatus]);

  return {
    readings,
    filteredReadings,
    loading,
    error,
    setError,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    filterStatus,
    setFilterStatus,
    
    // Modal & Form
    isModalOpen,
    editingReading,
    formData,
    openAddModal,
    openEditModal,
    closeModal,
    handleInputChange,
    
    // CRUD ops
    saveReading,
    deleteReading,
    incrementChapter,
    
    // Dashboard Stats
    stats
  };
}
