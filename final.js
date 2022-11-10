const userInput = document.getElementById('textArea');
const inputBtn = document.getElementById('input-btn');
const displayArea = document.getElementById('displayArea');

//1. function to get the local data
// window.onload = function setTemplate() {
//     displayArea.innerHTML = localStorage.getItem('template');
// }

// //2. function to save data in local storage
// const saveToLocal = () => {
//     localStorage.setItem('template', displayArea.innerHTML);
// }

const likeImg = `<i id=like-img class="fa-solid fa-thumbs-up" ></i><br>`;
// const deleteImg = `<i class="fa-solid fa-trash"></i>`;
const replyBtn = `<i class="fa-sharp fa-solid fa-comment-dots"></i>`;

let userComment = '';
let commentData = [];

// store input value
userInput.addEventListener('change', (e) => {
    userComment = e.target.value
    console.log(userComment);
})

const addComment = () => {
    //temp object to store data
    let commentObj = {
        id: commentData.length + 1,
        like: 0,
        reply: []
    } 

    commentData.push(commentObj);

    // let commentId = commentData; Doubt   // comment_1

    let html = `
        <div id=comment_${commentObj.id} class=comments-div>
           <p class=comments>${userComment}<p>   

           <button id=like_${commentObj.id} class=btn>
            ${likeImg} Like
           </button>

           <button id=reply_${commentObj.id} class="btn reply-btn">
            ${replyBtn}<br>Reply
           </button>

           <button id=delete_${commentObj.id} class='btn delete-btn'>
            Delete
           </button>
        </div> `;
                
    if(userComment.length > 0){
        displayArea.innerHTML += html;
    }
    console.log(userComment);

    //userComment = ""; // doubt - will be for reply
    console.log(userComment);

    userInput.value = ""; // empty main input box

    saveToLocal();
}

//calling addComment on button click
inputBtn.addEventListener('click', addComment);

// adding single event to perent using Event Deligation
displayArea.addEventListener('click', (e) => {
    console.log(e.target);

    if(e.target.tagName === "BUTTON") {
        // getting index
        const index = e.target.id.split("_")[1]; // after split we will get =>  ['like', 1] and from index 1 we will get id number like 1, 2etc

        console.log(index); //1,2 etc

        // https://www.w3schools.com/jsref/prop_node_textcontent.asp  
        const id = 'comment_' + index;
        const commentDiv = document.querySelector(`#${id}`);
        // #comment_1

        //document.querySelector("#inputbtn")

      console.log(commentDiv);
       
      if(e.target.textContent.includes('Like')) {
            commentData[index-1].like += 1;

            // e.target.textContent = commentData[index-1].like + "Like"; // we need to add Like otherwise it will work only 1 time

            e.target.innerHTML =  `${likeImg} ${commentData[index-1].like}- Like`; // we need to add Like otherwise it will work only 1 time

            console.log(e.target.textContent);

            saveToLocal();
        }
        else if(e.target.textContent === 'Delete') {
            console.log(e.target.textContent);
            commentDiv.remove();
            //saveToLocal();
        }   
        else if(e.target.textContent.includes('Reply')) {
            const replyIndex =  commentData[index-1].reply.length + 1;
            console.log('replyIndex = ', replyIndex); //1, 2

            const replyBox = `
                <div id=replyContainer_${index}> 
                    <textarea type="text" id=replyinput_${index}_${replyIndex} class=input-area></textarea>
                    <br/>
                    <button id=replyinput_${index}_${replyIndex} class=btn>Save</button>
                    <button id=replyinput_${index}_${replyIndex} class=btn>Cancel</button>                         
                </div>`;  

            commentDiv.innerHTML += replyBox; // #comment_1
            console.log(commentDiv);
        }
        else if(e.target.textContent === 'Save') {
            const replyIndex = e.target.id.split('_')[2]; //id = comment_1_1
            let val = '';

            if(replyIndex) {
                //store value of reply input box
                val = document.querySelector(`#replyinput_${index}_${replyIndex}`).value; 
            }

            if(val != '') {
                (e.target.parentElement.parentElement).innerHTML += `
                 <div class=all-reply-input>${val}</div>`;
                 
                 // remove reply comment box
                 document.querySelector(`#${e.target.parentElement.id}`).remove();

                 commentData[index-1].reply.push(val);

                 saveToLocal();
            }
            console.log(commentData)
        } 
        else if(e.target.textContent === 'Cancel') {
              document.querySelector(`#${e.target.parentElement.id}`).remove();
        }  
    } 
})