import { TestBed } from '@angular/core/testing';

import { TaskStore } from './task.store';
import { ITask } from '../models/task.interface';
import { STORAGE_KEY } from '../../../core/tokens/storage.token';

describe('TaskStore', () => {
  let service: TaskStore;
  let storageKey: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TaskStore,
        {
          provide: STORAGE_KEY,
          useValue: 'prueba_tecnica_task_test'
        }
      ]
    });
    storageKey = TestBed.inject(STORAGE_KEY);
  });

  describe('Inicialización de servicio', () => {

    beforeEach(() => {
      service = TestBed.inject(TaskStore);
    })

    it('Deberia estar creado', () => {
      expect(service).toBeTruthy();
    });

    it('Deberia iniciar con un array de tareas vacio', () => {
      expect(service.tasks()).toEqual([])
    })

    it('Deberia iniciar con todos los filtros en null', () => {
      expect(service.activeFilter()).toEqual({
        'backlog': null,
        'in-progress': null,
        'done': null
      })
    })
  })

  describe('Funcionalidades generales', () => {
    beforeEach(() => {
      service = TestBed.inject(TaskStore)
    })

    it('Deberia agregar una tarea', () => {
      service.addTask('Test', 'Test', 'low')
      expect(service.tasks().length).toBe(1)
    })

    it('Deberia editar una tarea', () => {
      service.addTask('Test', 'Test', 'low')
      service.editTask(service.tasks()[0].id, { name: 'Test 2' })
      expect(service.tasks()[0].name).toBe('Test 2')
    })

    it('Deberia agregar tareas al final de la columna', () => {
      service.addTask('Test', 'Test', 'low')
      expect(service.tasks()[0].order).toBe(0)
      service.addTask('Test 2', 'Test 2', 'none')
      expect(service.tasks()[0].order).toBe(0)
      expect(service.tasks()[1].order).toBe(1)
    })

    it('Deberia remover una tarea', () => {
      service.addTask('Test', 'Test', 'low')
      service.removeTask(service.tasks()[0].id)
      expect(service.tasks().length).toBe(0)
    })

    it('Deberia cambiar el estado de una tarea al cambiar de columna', () => {
      service.addTask('Test', 'Test', 'low')
      expect(service.tasks()[0].state).toBe('backlog')
      service.moveTask(service.tasks()[0].id, 'in-progress', 0)
      expect(service.tasks()[0].state).toBe('in-progress')
    })

    it('Deberia reordenar las tareas cuando se mueve una tarea a otra columna', () => {
      service.addTask('Test', 'Test', 'low')
      service.addTask('Test 2', 'Test 2', 'none')
      expect(service.tasks()[0].order).toBe(0)
      expect(service.tasks()[1].order).toBe(1)
      service.moveTask(service.tasks()[1].id, 'in-progress', 0)
      expect(service.tasks()[0].order).toBe(0)
      expect(service.tasks()[1].order).toBe(0)
    })

    it('Deberia reordenar las tareas cuando se mueve una tarea con los filtros activos', () => {
      service.addTask('Test', 'Test', 'low')
      service.addTask('Test 2', 'Test 2', 'low')
      expect(service.tasks()[0].order).toBe(0)
      expect(service.tasks()[1].order).toBe(1)

      service.filterTasksByPriority('backlog', 'low')
      service.moveTask(service.tasks()[1].id, 'in-progress', 0)
      expect(service.tasks()[0].order).toBe(0)
      expect(service.tasks()[1].order).toBe(0)
    })

    it('Deberia filtrar tareas por prioridad', () => {
      service.addTask('Test', 'Test', 'low')
      service.filterTasksByPriority('backlog', 'low')
      expect(service.activeFilter().backlog).toBe('low')
    })

    it('Deberia resetear el filtro', () => {
      service.addTask('Test', 'Test', 'low')
      service.filterTasksByPriority('backlog', 'low')
      service.resetFilter('backlog')
      expect(service.activeFilter().backlog).toBeNull()
    })
  })

  describe('Persistencia en LocalStorage', () => {

    afterEach(() => {
      localStorage.removeItem(storageKey)
    })

    it('Deberia cargar las tareas de localStorage al iniciar', () => {
      const task: ITask = {
        id: crypto.randomUUID(),
        name: 'Test',
        description: 'Test',
        priority: 'low',
        state: 'backlog',
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      localStorage.setItem(storageKey, JSON.stringify([task]))
      service = TestBed.inject(TaskStore)
      expect(service.tasks()[0]).toEqual(task)
    })

    it('Deberia guardar las tareas en localStorage al modificarlas', () => {
      service = TestBed.inject(TaskStore)
      service.addTask('Test', 'Test', 'low')
      TestBed.tick()
      const stored = localStorage.getItem(storageKey)
      expect(stored).not.toBeNull()
      expect(stored).toEqual(JSON.stringify([
        {
          id: service.tasks()[0].id,
          name: 'Test',
          description: 'Test',
          priority: 'low',
          state: 'backlog',
          order: 0,
          createdAt: service.tasks()[0].createdAt,
          updatedAt: service.tasks()[0].updatedAt
        }
      ]))
    })

    it('Deberia crear un array vacio en localStorage si no existe', () => {
      localStorage.removeItem(storageKey)
      service = TestBed.inject(TaskStore)
      expect(service.tasks().length).toBe(0)
      expect(localStorage.getItem(storageKey)).toBe('[]')
    })

    it('Deberia crear un array vacio si localStorage tiene un valor invalido', () => {
      localStorage.setItem(storageKey, 'invalid')
      service = TestBed.inject(TaskStore)
      expect(service.tasks().length).toBe(0)
      expect(localStorage.getItem(storageKey)).toBe('[]')
    })

  })

  describe('Casos bordes', () => {
    beforeEach(() => {
      service = TestBed.inject(TaskStore)
    })

    it('Deberia agregar una tarea con descripción null', () => {
      service.addTask('Test', null, 'low')
      expect(service.tasks()[0].description).toBeNull()
      expect(service.tasks().length).toBe(1)
    })

    it('Deberia evitar agregar una tarea con nombre vacio', () => {
      service.addTask('   ', 'Descripcion', 'low')
      expect(service.tasks().length).toBe(0)
    })

    it('Deberia crear la tarea con descripcion null si se pasa un string de espacios en blanco', () => {
      service.addTask('Test', '   ', 'low')
      expect(service.tasks()[0].description).toBeNull()
      expect(service.tasks().length).toBe(1)
    })

    it('Deberia evitar agregar una tarea si el nombre y la descripcion son strings vacios', () => {
      service.addTask('   ', '   ', 'low')
      expect(service.tasks().length).toBe(0)
    })

    it('Deberia evitar mover una tarea que no existe', () => {
      service.addTask('Test', 'Test', 'low')
      service.moveTask('test', 'in-progress', 0)
      expect(service.groupedTasks().backlog.length).toBe(1)
      expect(service.groupedTasks()['in-progress'].length).toBe(0)
    })

    it('Deberia evitar editar una tarea que no existe', () => {
      service.addTask('Test', 'Test', 'low')
      service.editTask('test', { name: 'Test 2' })
      expect(service.groupedTasks().backlog.length).toBe(1)
      expect(service.groupedTasks().backlog[0].name).toEqual(service.tasks()[0].name)
    })

    it('Deberia evitar remover una tarea que no existe', () => {
      service.addTask('Test', 'Test', 'low')
      service.removeTask('test')
      expect(service.groupedTasks().backlog.length).toBe(1)
    })

    it('Deberia evitar editar una tarea con nombre vacio', () => {
      service.addTask('Test', 'Test', 'low')
      service.editTask(service.tasks()[0].id, { name: '   ' })
      expect(service.groupedTasks().backlog.length).toBe(1)
      expect(service.groupedTasks().backlog[0].name).toEqual(service.tasks()[0].name)
    })

    it('Deberia evitar editar una tarea con descripcion vacia', () => {
      service.addTask('Test', 'Test', 'low')
      service.editTask(service.tasks()[0].id, { description: '   ' })
      expect(service.groupedTasks().backlog.length).toBe(1)
      expect(service.groupedTasks().backlog[0].description).toEqual(service.tasks()[0].description)
    })

    it('Deberia evitar editar una tarea con nombre y descripcion vacios', () => {
      service.addTask('Test', 'Test', 'low')
      service.editTask(service.tasks()[0].id, { name: '   ', description: '   ' })
      expect(service.groupedTasks().backlog.length).toBe(1)
      expect(service.groupedTasks().backlog[0].name).toEqual(service.tasks()[0].name)
      expect(service.groupedTasks().backlog[0].description).toEqual(service.tasks()[0].description)
    })

    it('Deberia evitar reordenar una tarea a un indice fuera de los limites', () => {
      service.addTask('Test', 'Test', 'low')
      service.addTask('Test 2', 'Test 2', 'low')
      service.moveTask(service.tasks()[0].id, 'backlog', 10)
      expect(service.groupedTasks().backlog.length).toBe(2)
      expect(service.groupedTasks().backlog[0].name).toEqual(service.tasks()[0].name)
      expect(service.groupedTasks().backlog[0].order).toEqual(service.tasks()[0].order)
    })

    it('Deberia evitar reordenar una tarea a un indice negativo', () => {
      service.addTask('Test', 'Test', 'low')
      service.addTask('Test 2', 'Test 2', 'low')
      service.moveTask(service.tasks()[0].id, 'backlog', -1)
      expect(service.groupedTasks().backlog.length).toBe(2)
      expect(service.groupedTasks().backlog[0].order).toEqual(service.tasks()[0].order)
      expect(service.groupedTasks().backlog[1].order).toEqual(service.tasks()[1].order)
    })
  })

});
