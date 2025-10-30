import { describe, it, expect } from 'vitest';
import { isStrongPassword } from '../utils/passwordValidation';

describe('Utilidad de Validación de Contraseña', () => {

  it('debería devolver true para una contraseña que cumple todos los requisitos', () => {
    const strongPassword = 'Password123!';
    expect(isStrongPassword(strongPassword)).toBe(true);
  });

  it('debería devolver false para contraseñas que no cumplen los requisitos', () => {
    const weakPasswords = [
      'pass123!',    
      'PASS123!',    
      'Password!',   
      'Password123', 
      'Pass1!',      
      ''             
    ];
    
    weakPasswords.forEach(password => {
      expect(isStrongPassword(password)).toBe(false);
    });
  });

  it('debería devolver false para un valor nulo o indefinido', () => {
    expect(isStrongPassword(null)).toBe(false);
    expect(isStrongPassword(undefined)).toBe(false);
  });

});