import { describe, it, expect } from 'vitest';
import { validateRut, formatRut } from '../utils/rutUtils';

describe('Utilidades de RUT', () => {
  describe('validateRut', () => {
    it('debería devolver true para un RUT válido', () => {
      expect(validateRut('11.111.111-1')).toBe(true);
    });

    it('debería devolver false para un RUT con dígito verificador incorrecto', () => {
      expect(validateRut('19.815.339-1')).toBe(false);
    });
  });

  describe('formatRut', () => {
    it('debería formatear un RUT sin puntos ni guion', () => {
      expect(formatRut('19815339k')).toBe('19.815.339-K');
    });
  });
});