import React from 'react';
import { useReadings } from './hooks/useReadings';
import Header from './components/Header';
import StatsDashboard from './components/StatsDashboard';
import ControlsBar from './components/ControlsBar';
import ReadingCard from './components/ReadingCard';
import ReadingModal from './components/ReadingModal';
import Spinner from './components/Spinner';
import { AlertCircle, X, BookOpen, Plus } from 'lucide-react';

function App() {
  const {
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
    
    // Stats
    stats
  } = useReadings();

  return (
    <div className="flex flex-col gap-7 w-full max-w-[1200px] mx-auto px-4 py-8 min-h-screen animate-fade-in">
      {/* Header */}
      <Header onAddClick={openAddModal} />

      {/* Warnings & Errors */}
      {error && (
        <div className="flex items-center gap-3 p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-white text-sm glass">
          <AlertCircle size={20} className="text-status-dropped" />
          <span>{error}</span>
          <button className="ml-auto bg-transparent text-gray-400 hover:text-white cursor-pointer" onClick={() => setError(null)}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* Stats Dashboard */}
      <StatsDashboard stats={stats} />

      {/* Filter and Search Bar */}
      <ControlsBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterType={filterType}
        onFilterTypeChange={setFilterType}
        filterStatus={filterStatus}
        onFilterStatusChange={setFilterStatus}
      />

      {/* Main Grid / List */}
      {loading ? (
        <Spinner message="Cargando tus lecturas..." />
      ) : filteredReadings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-10 gap-4 text-center text-gray-400 glass rounded-2xl">
          <BookOpen size={48} className="text-gray-500" />
          <h3 className="text-white text-xl font-semibold">No se encontraron lecturas</h3>
          <p className="max-w-[340px] text-sm text-gray-400">Prueba ajustando los filtros o agrega una nueva lectura para comenzar.</p>
          <button 
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-manhwa to-violet-700 text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:translate-y-[-1px] hover:brightness-110 active:translate-y-0 transition-all border border-white/10 shadow-md cursor-pointer"
            onClick={openAddModal}
          >
            <Plus size={16} />
            <span>Agregar Lectura</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredReadings.map((item) => (
            <ReadingCard
              key={item.id}
              item={item}
              onIncrement={incrementChapter}
              onEdit={openEditModal}
              onDelete={deleteReading}
            />
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <ReadingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        editingReading={editingReading}
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={saveReading}
      />
    </div>
  );
}

export default App;
