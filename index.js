document.addEventListener('DOMContentLoaded', function (event) {
    const addBtn = document.querySelector('#addBtn');
    const nameInput = document.querySelector('#name');

    const stepContainer = document.querySelector('#stepContainer');
    const form = document.querySelector('form');


    let stepList = [];

    stepList = JSON.parse(localStorage.getItem('tareas'));

    if (stepList != null)
        renderSteps(stepContainer);
    else
        stepList = []

    form.addEventListener('submit', function (e) {
        e.preventDefault()
        addStep()
    }, false);

    function addStep() {
        if (nameInput.value != '') {
            let step = {
                name: nameInput.value,
            }

            stepList.push(step);

            localStorage.setItem('tareas', JSON.stringify(stepList))
            renderSteps(stepContainer);
        } else {
            Notification.requestPermission(function (permission) {
                // If the user accepts, let's create a notification
                if (permission === "granted") {
                    var notification = new Notification('Asigne una tarea');
                }
            });
        }
    }

    function renderSteps(container) {
        var html = '';
        console.log(stepList.length)
        for (var i = 0; i < stepList.length; i++) {
            html += `<div class="stepLine border-radius-1" id="` + i + `">
                        <div>` + stepList[i].name + ` </div>                        
                        <i class="fa fa-times-circle btnClose" aria-hidden="true"></i>
                    </div>`;
        }

        if (html == '') html = 'No hay tareas pendientes';
        container.innerHTML = html;
        form.reset();
        nameInput.focus();

        const deleteBtn = document.querySelectorAll('.btnClose');

        deleteBtn.forEach(function (element) {
            element.addEventListener('click', function (e) {
                if (confirm('Eliminar tarea?')) {
                    const index = e.target.parentElement.getAttribute('id');
                    if (index > -1) { // only splice array when item is found
                        stepList.splice(index, 1); // 2nd parameter means remove one item only
                    }
                    localStorage.setItem('tareas', JSON.stringify(stepList))
                    renderSteps(container)
                }
            }, false);
        });
    }
});

