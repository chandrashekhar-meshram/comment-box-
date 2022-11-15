//create commentContainer variable 
const commentContainer = document.getElementById('allComments');


// part 1   => function to get the local data
window.onload = function setTemplate() {
    // document.getElementById('allComments').innerHTML = localStorage.getItem('template');
    commentContainer.innerHTML = localStorage.getItem('template');
};


// part 2  => function to save data in local storage
function saveToLocal() {
    localStorage.setItem('template', commentContainer.innerHTML);
}

// part 3  - 
// checking class name present or not ..if class present return true otherwise false
function hasClass(elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
}


// part 4  => Add comments dynamically
//reply, like ,delete buttons  
function addComment(ev) {
    let commentText, wrapDiv;
    const textBox = document.createElement('div');

    // create button structure for reply
    const replyButton = document.createElement('button');
    replyButton.className = 'reply';
    replyButton.innerHTML = 'Reply';

    // for like
    const likeButton = document.createElement('button');
    likeButton.className = 'likeComment';
    likeButton.innerHTML = `Like`;
   

    // for delete
    const deleteButton = document.createElement('button');   
    deleteButton.className = 'deleteComment';
    deleteButton.innerHTML = `Delete`;
    

    // add comment from main container with textBox, replyButton, likeButton, deleteButton.
    if (hasClass(ev.target.parentElement, 'container')) {
        // console.log(ev.target.parentElement);
        const wrapDiv = document.createElement('div');
        wrapDiv.className = 'wrapper';
        wrapDiv.style.marginLeft = 0;
        // storing textarea value of main textarea
        commentText = document.getElementById('comment').value;
        // after click on add button empty main textarea
        document.getElementById('comment').value = '';

        //adding text from main commentBox
        if (commentText.length > 0) {
            textBox.innerHTML = commentText;
            textBox.style.backgroundColor = "cornflowerblue";
            //append all 
            wrapDiv.append(textBox, replyButton, likeButton, deleteButton);
            commentContainer.appendChild(wrapDiv);
        }
    }
    else {
        // this is for child comment add
        // it will work after reply comment on click add button
        wrapDiv = ev.target.parentElement;
        // console.log(ev.target.parentElement);
        commentText = ev.target.parentElement.firstElementChild.value;

        console.log('commentText', commentText);

        if (commentText.length > 0) {
            textBox.innerHTML = commentText;
            textBox.style.backgroundColor = "tomato";
            // remove textarea after add reply on child
            wrapDiv.innerHTML = '';
            // add all button same as like parenth comment
            wrapDiv.append(textBox, replyButton, likeButton, deleteButton);
        }
    }
    saveToLocal();
}

// part 5
// adding event listner onbutton click to call addComment
document.getElementById('addComments').addEventListener('click', function (ev) {
    addComment(ev);
});


// part 6
document.getElementById('allComments').addEventListener('click', function (e) {
    // creating HTML for reply
    if (hasClass(e.target, 'reply')) {
        const parentDiv = e.target.parentElement;
        const wrapDiv = document.createElement('div');
        wrapDiv.style.marginLeft = (Number.parseInt(parentDiv.style.marginLeft) + 15).toString() + 'px';
        wrapDiv.className = 'wrapper';
        const textArea = document.createElement('textarea');
        textArea.style.marginRight = '20px';

        // ADD button create for reply box on click
        const addButton = document.createElement('button');
        addButton.className = 'addReply';
        addButton.innerHTML = 'Add';

        // cancel button  create for reply box on click
        const cancelButton = document.createElement('button');
        cancelButton.innerHTML = 'Cancel';
        cancelButton.className = 'cancelReply';

        wrapDiv.append(textArea, addButton, cancelButton);
        parentDiv.appendChild(wrapDiv);

    }

    // adding all the html data from addComment function for reply
    else if (hasClass(e.target, 'addReply')) {
        addComment(e);
    }

    // adding like on button click
    else if (hasClass(e.target, 'likeComment')) {
        const likeBtnValue = e.target.innerHTML;
        e.target.innerHTML = likeBtnValue !== 'Like' ? Number.parseInt(likeBtnValue) + 1 + " Like" : 1 + " Like";
        saveToLocal();
    }
    
    // cancel reply on button click
    else if (hasClass(e.target, 'cancelReply')) {
        e.target.parentElement.innerHTML = '';
        saveToLocal();
    }

    // delete entire  comment chain
    else if (hasClass(e.target, 'deleteComment')) {
        e.target.parentElement.remove();
        saveToLocal();
    }
});