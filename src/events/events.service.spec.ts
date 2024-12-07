import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';

import { getModelToken } from '@nestjs/sequelize';
import { Event } from 'src/schemas/event.model';


describe('EventsService', () => {
  let service: EventsService;

  const mockEvent = {
    id: 1,
    name: 'Event 1',
    description: 'Description 1',
    startDate: new Date(),
    endDate: new Date(),
    location: 'Location 1',
    capacity: 100,
  }


  const mockEventModel = {
    build: jest.fn().mockReturnThis(), // Permite encadenar métodos
    save: jest.fn(),
    findOne: jest.fn().mockResolvedValue(mockEvent),
  };

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: getModelToken(Event),
          useValue: mockEventModel,
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });


  it('should get event by id', async () => {
    const a = await  service.getById(1)
    expect(a).toBeDefined()
  });

  it('should get event by id', async () => {
    try {
      const a = await  service.getById(null)
    } catch (error) {
      expect(error.message).toBe('Id is required')
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

  


