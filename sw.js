
    stepList = localStorage.getItem('tareas');

   

    if (stepList != null)
        renderSteps(stepContainer);
    else 
        stepList = []

    console.log(stepList)
    addBtn.addEventListener('click',function (){
        let step = [
            nameInput.value,
            dateInput.value,
            remindChk.checked
        ]
        
        stepList.push(step);
      
        localStorage.setItem('tareas',stepList)
        renderSteps(stepContainer);
        
    },false);

       function renderSteps( container) {
        var html = '';

      
        for (step of stepList) {
            //console.log(step)

           // html += ` <a href="#" class="list-group-item list-group-item-action px-3 border-0 rounded-3 mb-2 list-group-item-primary"
            //>` + step[0][0] + `</a >`
            
        }

        container.innerHTML = html
    }