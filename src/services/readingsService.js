import { supabase } from './supabaseClient';

export const readingsService = {
  /**
   * Obtiene todas las lecturas de la base de datos ordenadas por fecha de actualización descendente.
   */
  async getReadings() {
    const { data, error } = await supabase
      .from('readings')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Crea un nuevo registro de lectura.
   */
  async createReading(reading) {
    const { data, error } = await supabase
      .from('readings')
      .insert([reading])
      .select();

    if (error) throw error;
    return data ? data[0] : null;
  },

  /**
   * Actualiza una lectura existente por su ID.
   */
  async updateReading(id, updates) {
    const { data, error } = await supabase
      .from('readings')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select();

    if (error) throw error;
    return data ? data[0] : null;
  },

  /**
   * Incrementa el capítulo actual en 1.
   */
  async incrementReadingChapter(id, currentVal) {
    const { data, error } = await supabase
      .from('readings')
      .update({
        current_chapter: currentVal + 1,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select();

    if (error) throw error;
    return data ? data[0] : null;
  },

  /**
   * Elimina un registro de lectura por su ID.
   */
  async deleteReading(id) {
    const { error } = await supabase
      .from('readings')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};
