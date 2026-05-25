import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { MessageService, ConfirmationService } from 'primeng/api'
import { STORAGE_KEY } from './core/tokens/storage.token';
import { TaskStore } from './features/tasks/state/task.store';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

describe('App', () => {

  let fixture: ComponentFixture<App>;
  let component: App;

  let store: TaskStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        MessageService,
        ConfirmationService,
        { provide: STORAGE_KEY, useValue: 'prueba_tecnica_task_test' },
        TaskStore
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    store = TestBed.inject(TaskStore);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia renderizar las tres columnas', () => {
    const columns = fixture.nativeElement.querySelectorAll('[data-column]')

    expect(columns.length).toBe(3)
    expect(columns[0].getAttribute('data-column')).toBe('backlog')
    expect(columns[1].getAttribute('data-column')).toBe('in-progress')
    expect(columns[2].getAttribute('data-column')).toBe('done')
  })

  it('Deberia mostrar mensaje vacio si no hay tareas para la lista "Por hacer"', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-column="backlog"] .empty-container p')?.textContent).toEqual('No hay tareas en esta columna');
  });

  it('Deberia mostrar mensaje vacio si no hay tareas para la lista "En progreso"', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-column="in-progress"] .empty-container p')?.textContent).toEqual('No hay tareas en esta columna');
  });

  it('Deberia mostrar mensaje vacio si no hay tareas para la lista "Hecho"', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-column="done"] .empty-container p')?.textContent).toEqual('No hay tareas en esta columna');
  });

  it('Deberia renderizar una tarea en la columna "Por hacer" si hay tareas en la lista', () => {
    store.addTask('Test', null, 'none')
    TestBed.tick()
    fixture.detectChanges()

    const tasks = fixture.nativeElement.querySelectorAll('[data-column="backlog"] .task-item')

    expect(tasks.length).toBe(1)
    expect(tasks[0].textContent).toContain(store.tasks()[0].name)
  })

  it('Deberia mover la tarea a la columna "En progreso"', () => {

    store.addTask(
      'Test',
      null,
      'none'
    );

    TestBed.tick();
    fixture.detectChanges();

    component.handleDrop({
      previousContainer: {
        data: store.groupedTasks().backlog,
      },
      container: {
        data: store.groupedTasks()['in-progress'],
      },
      previousIndex: 0,
      currentIndex: 0,
      item: { data: store.tasks()[0] },
      distance: { x: 0, y: 0 },
      dropPoint: { x: 0, y: 0 },
    } as any, 'in-progress');

    TestBed.tick();
    fixture.detectChanges();

    const inProgressTasks =
      fixture.nativeElement.querySelectorAll(
        '[data-column="in-progress"] .task-item'
      );

    expect(inProgressTasks.length)
      .toBe(1);

    expect(
      inProgressTasks[0].textContent
    ).toContain('Test');

  });

});
