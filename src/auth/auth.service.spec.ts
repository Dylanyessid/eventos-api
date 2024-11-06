import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from '../schemas/user.model';
import { Sequelize } from 'sequelize-typescript';
import { getModelToken } from '@nestjs/sequelize';
import { UserRole } from '../schemas/userRoles.model';
import { JwtService } from '@nestjs/jwt';
import { RegisterDTO } from './dto/register.dto';

describe('AuthService', () => {
  let service: AuthService;
  let sequelize: Sequelize;
  const mockUserModel = {
    build: jest.fn().mockReturnThis(), // Permite encadenar métodos
    save: jest.fn(),
  };

  const mockRoleUserModel = {
    build: jest.fn().mockReturnThis(),
    save: jest.fn(),
  };

  const mockTransaction = {
    commit: jest.fn(),
    rollback: jest.fn(),
  };

  const mockSequelize = {
    transaction: jest.fn().mockResolvedValue(mockTransaction), // Mockea la función de transacción
  };

  const mockJwt = {
    sign : jest.fn().mockReturnValue('mocked-token')
  }

  beforeEach(async () => {
   

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: Sequelize,
          useValue: mockSequelize, // Usamos el mock de Sequelize
        },
        {
          provide: getModelToken(User), // Nombre del modelo de usuario
          useValue: mockUserModel,
        },
        {
          provide: getModelToken(UserRole), // Nombre del modelo de rol de usuario
          useValue: mockRoleUserModel,
        },
        {
          provide: JwtService, // Nombre del modelo de rol de usuario
          useValue: mockJwt,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks(); 
  });
  
  /* Unit tests */
  it('should return a new user', async()=>{

    const dto:RegisterDTO = {
      name: "Dylan",
      email: "dylan@mail.com",
      password:"DCJSDIKS"
    }
    mockUserModel.save.mockResolvedValue({
      id:3, ...dto
    })
    mockRoleUserModel.save.mockResolvedValue({});
    const user = await service.createUser({email:'dylan@mail.com', name:'Dylan', password:'DCJSDIKS'})
    expect(user).toHaveProperty("email")
    expect(typeof user.email).toBe('string')
    expect(typeof user.id).toBe('number')
  })

  it('should handle error when register', async()=>{
    mockRoleUserModel.save.mockRejectedValue(new Error('Database error'));
    const user = await service.createUser({email:'dylan@mail.com', name:'Dylan', password:'DCJSDIKS'})
    expect(user).toBeNull()
  })

  it('should return a string as jwt token', async()=>{
    const token = await service.login({email:'dylan@mail.com', user:3, role:3})
    expect(typeof token).toBe('string')
  })


});
