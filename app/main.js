const lists = document.querySelectorAll('.list');
const button = document.querySelector('.button');
const boards = document.querySelectorAll('.boards__item');
const removeBtn = document.querySelectorAll('.removeBtn');

function addTask() {
  const btn = document.querySelector('.add__btn');
  const addBtn = document.querySelector('.add__item-btn');
  const cancelBtn = document.querySelector('.cancel__item-btn');
  const textarea = document.querySelector('.textarea');
  const form = document.querySelector('.form');
  let value;

  //очистка тайтла
  function clear() {
    textarea.value = '';
    form.style.display = 'none';
    btn.style.display = 'flex';
  }

  //скрыть и раскрыть кнопки при нажатии на "+добавить"
  btn.addEventListener('click', () => {
    form.style.display = 'block';
    btn.style.display = 'none';
    addBtn.style.display = 'none';

    textarea.addEventListener('input', (e) => {
      value = e.target.value;

      if (value) {
        addBtn.style.display = 'block';
      } else {
        addBtn.style.display = 'none';
      }
    });
  });

  //очистить инпут при отмене
  cancelBtn.addEventListener('click', clear);

  //создание карточки
  addBtn.addEventListener('click', () => {
    const newItem = document.createElement('div');
    newItem.classList.add('list__item');
    newItem.draggable = true;
    newItem.textContent = value;
    lists[0].append(newItem);

    clear();
  });
}
addTask();

//создание доски
function addBoard() {
  const boards = document.querySelector('.boards');
  const board = document.createElement('div');

  board.classList.add('boards__item');
  board.innerHTML = `<div class="header">
  <span contenteditable="true" class="title">Введите название</span>
  <div class="removeBtn">x</div>
</div>`;
  boards.append(board);
  const removeBtn = board.querySelector('.removeBtn');
  removeBtn.addEventListener('click', () => {
    board.remove();
  });
  changeTitle();
  dragNdrop();
}
button.addEventListener('click', addBoard);

function changeTitle() {
  const titles = document.querySelectorAll('.title');
  titles.forEach((title) => title.addEventListener('click', (e) => (e.target.textContent = '')));
}
changeTitle();

function dragNdrop() {
  let draggedItem = null;
  const listItems = document.querySelectorAll('.list__item');
  const lists = document.querySelectorAll('.list');

  for (let item of listItems) {
    item.addEventListener('dragstart', () => {
      draggedItem = item;
      setTimeout(() => {
        item.style.display = 'none';
      }, 0);
    });
    item.addEventListener('dragend', () => {
      setTimeout(() => {
        item.style.display = 'block';
        draggedItem = null;
      }, 0);
    });
    item.addEventListener('dblclick', (e) => {
      item.remove();
    });

    for (let j = 0; j < lists.length; j++) {
      const list = lists[j];
      list.addEventListener('dragover', (e) => e.preventDefault());
      list.addEventListener('dragenter', function (e) {
        e.preventDefault();
        this.style.backgroundColor = 'rgba(0,0,0,.5)';
      });
      list.addEventListener('dragleave', function (e) {
        this.style.backgroundColor = 'rgba(0,0,0, 0)';
      });
      list.addEventListener('drop', function (e) {
        this.style.backgroundColor = 'rgba(0,0,0, 0)';
        this.append(draggedItem);
      });
    }
  }
}
//Удаление доски
function delet() {
  const removeBtn = document.querySelector('.removeBtn');
  const boardItem = removeBtn.closest('.boards__item');

  removeBtn.addEventListener('click', () => {
    boardItem.remove();
  });
}
delet();
