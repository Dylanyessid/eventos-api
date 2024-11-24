import { SetMetadata } from '@nestjs/common';

// Crear un decorador personalizado para marcar rutas sin validación JWT
export const SkipJwtValidation = () => SetMetadata('skipJwtValidation', true);