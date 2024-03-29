let $fileInput = $('#file-input');
let $fileList = $('.file-list');
let $cnt = $('.cnt');

// 서머노트
$(document).ready(function () {
  $("#summernote").summernote({
    height: 500,
    lang: "ko-KR",
    toolbar: [
      ["style", ["style"]],
      ["font", ["bold", "italic", "underline", "clear"]],
      ["fontname", ["fontname"]],
      ["color", ["color"]],
      ["para", ["ul", "ol", "paragraph"]],
    ],
    placeholder:
      "<br>* 식고수에게 궁금한 점을 작성해주세요 ! <br>",
  });
});


// 파일 넣었을시 파일 담기 
let $tmpInput = $('#file-input');
  
$tmpInput.on('change', function () {
  let files = this.files;
  inputProce(this);

  $fileList.html('');

  //1개를 넘기면 초기화 처리
  if(files.length > 1){
    let dt = new DataTransfer();
    files = dt.files;
    alert("파일은 최대 1개 까지만 첨부 가능합니다.")
    $cnt.text(files.length);
    return;
  }
  
  for(let i=0; i<files.length; i++){
    let src = URL.createObjectURL(files[i]);
    
    $fileList.append(`
        <li>
          <div class="show-img-box">
            <img src=${src}>
          </div>
          <div class="btn-box">
            <button type='button' class='img-cancel-btn' data-name='${files[i].name}'>삭제</button>
          </div>
        </li>
    `);
  }
  $cnt.text(files.length);
});

function inputProce(target){
  let files = target.files;
  console.log('change!!!')

  let $input = $('.input');

  for (let i = 0; i < 1; i++) {
    if (i >= files.length) {
      let dt = new DataTransfer();

      $input[i].files = dt.files;
    } else {
      let dt = new DataTransfer();
      dt.items.add(files[i]);

      $input[i].files = dt.files;
    }
    $cnt.text(files.length);
  }};


$('.img-controller-box').on('click','.img-cancel-btn', function() {
  console.log($tmpInput[0].files)

   // 버튼의 부모의 부모를 삭제
  $(this).parent().parent().remove();
  let files =  $tmpInput[0].files;
  let fileName = $(this).data('name');
  let dt = new DataTransfer();

  for(let i=0; i<files.length; i++){
      if(files[i].name !== fileName)   {
        dt.items.add(files[i]);
      }
  }
  
  files = dt.files;
  $tmpInput[0].files = files;

  inputProce($tmpInput[0]);
  $cnt.text(files.length);
});

let $uploadBox = $('.upload-box');

$uploadBox.on('click', function () {
  console.log(this);
  $fileInput.trigger("click");
});

// 취소버튼 고수페이지로 이동처리 해야함.
$(".cancel-btn").on("click", () => {
  window.location.href = "#";
});


