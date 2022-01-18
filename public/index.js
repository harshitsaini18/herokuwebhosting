var btn = document.getElementById("btn");
var light = document.getElementById("light");

function toggleBtn() {
    btn.classList.toggle("active");
    light.classList.toggle("on");
}

//submit

function selectChange() {
    let inputArea = document.getElementById('inputArea');
    let typeSelectValue = document.getElementById('typeSelect').value;
    if (typeSelectValue == 'dpp') {
        inputArea.innerHTML = `
      <form action="/submitResult" method="post">
            <select id="dppSelect" name="subject" class="form-select form-select-sm shadow-sm  mb-3" aria-label=".form-select-sm example">
                           <option selected name="physics" value="physics">Physics</option>
                           <option name="chemistry" value="chemistry">Chemistry</option>
                           <option name="maths" value="maths">Maths</option>
                          </select>
                          <div class="  p-3 border rounded-3 shadow d-flex justify-content-between flex-wrap">
                           <div class="col-md-4 sbox m-2">
                            <div class="input-group has-validation">
                             <span class="input-group-text" id="inputGroupPrepend">Marks</span>
                             <input min="0" max="100" name="marks" type="number" class="form-control " style="  min-width:90px;" id="dppScore" aria-describedby="inputGroupPrepend" required>
                            </div>
                           </div>
                           <div class="col-md-4 sbox m-2">
                            <div class="input-group has-validation">
                             <span class="input-group-text" id="inputGroupPrepend">Complete</span>
                             <input min="0" max="100" name="complete" type="number" class="form-control " style="    min-width:90px;"id="dppComplete" aria-describedby="inputGroupPrepend" required>
                            </div>
                           </div>
                           <div class="col-12">
                            <button class="btn btn-primary"  style="width: 96px;">Submit</button>
                           </div>
                      </form>              
      `;
    } else if (typeSelectValue == 'test') {
        inputArea.innerHTML = `
       <form action="/submitResults" method="post">
      <div class=" p-3 border rounded-3 shadow d-flex justify-content-around flex-wrap">
        <span class="badge bg-warning font-monospace fs-5 bsubject ">Physics</span>
        <div class="col-md-4 m-2">
          <div class="input-group has-validation">
            <span class="input-group-text" id="inputGroupPrepend">Marks</span>
            <input  name="pmarks" type="number" class="form-control" style="  min-width:90px;"id="validationCustomUsername"
              aria-describedby="inputGroupPrepend" required>
          </div>
        </div>
        <div class="col-md-4 m-2">
          <div class="input-group has-validation">
            <span class="input-group-text" id="inputGroupPrepend">Complete</span>
            <input min="0" max="100" name="pcomplete" type="number" class="form-control" style="  min-width:90px;"id="validationCustomUsername"
              aria-describedby="inputGroupPrepend" required>
          </div>
        </div>
      </div>
      <div class=" p-3 border rounded-3 shadow d-flex justify-content-around flex-wrap">
        <span class="badge bg-warning font-monospace fs-5 bsubject ">Chemistry</span>
        <div class="col-md-4 m-2">
          <div class="input-group has-validation">
            <span class="input-group-text" id="inputGroupPrepend">Marks</span>
            <input  name="cmarks" type="number" class="form-control" style="  min-width:90px;"id="validationCustomUsername"
              aria-describedby="inputGroupPrepend" required>
          </div>
        </div>
        <div class="col-md-4 m-2">
          <div class="input-group has-validation">
            <span class="input-group-text" id="inputGroupPrepend">Complete</span>
            <input  min="0" max="100"name="ccomplete" type="number" class="form-control" style="  min-width:90px;"id="validationCustomUsername"
              aria-describedby="inputGroupPrepend" required>
          </div>
        </div>
      </div>
      <div class=" p-3 border rounded-3 shadow d-flex justify-content-around flex-wrap">
        <span class="badge bg-warning font-monospace fs-5 bsubject ">Maths</span>
        <div class="col-md-4 m-2">
          <div class="input-group has-validation">
            <span class="input-group-text" id="inputGroupPrepend">Marks</span>
            <input  name="mmarks" type="number" class="form-control" style="  min-width:90px;"id="validationCustomUsername"
              aria-describedby="inputGroupPrepend" required>
          </div>
        </div>
        <div class="col-md-4 m-2">
          <div class="input-group has-validation">
            <span class="input-group-text" id="inputGroupPrepend">Complete</span>
            <input min="0" max="100" name="mcomplete" type="number" class="form-control" style="  min-width:90px;"id="validationCustomUsername"
              aria-describedby="inputGroupPrepend" required>
          </div>
        </div>
      </div>
      <div class="col-12">
            <button class="btn btn-primary mt-2" style="width: 96px;">Submit</button>
      </div>
      </form> 
      `;
    } else {
        inputArea.innerHTML = `
        
      <div class=" badge bg-danger border rounded-2 fs-3 " >
        Please Select Test Type
      </div>
      `;
    }

}
// 55555555555555555555555555555555555555555555
//   let data = {
//     dpp: {
//       physics: {
//         score: 22,
//         complete: 22,
//         date: {
//           day: 1,
//           month: 2
//         }
//       },
//       maths: {
//         score: 22,
//         complete: 22,
//         date: {
//           day: 1,
//           month: 2
//         }
//       },
//       chemistry: {
//         score: 22,
//         complete: 22,
//         date: {
//           day: 1,
//           month: 2
//         }
//       }
//     },
//     test: {
//       physics: {
//         score: 22,
//         complete: 22,
//       },
//       maths: {
//         score: 22,
//         complete: 22,
//       },
//       chemistry: {
//         score: 22,
//         complete: 22,
//         date: {
//           day: 1,
//           month: 2
//         }
//       },
//       date: {
//         day: 1,
//         month: 2
//       },
//       total: 22
//     }
//   }
//   let stringifyData = JSON.stringify(data)
//  // console.log(stringifyData);
//   // console.log(JSON.parse(stringifyData));
//   let physicsDppScore = 0;
//   let mathsDppScore = 0;
//   let chemistryDppScore = 0;
//   let physicsDppComplete = 0;
//   let mathsDppComplete = 0;
//   let chemistryDppComplete = 0;
//  // const d = new Date();

//   function dppScore1() {
// let dppSelect = document.getElementById('dppSelect').value;
//     let dppScoreValue = document.getElementById("dppScore").value;
//     let dppCompleteValue = document.getElementById("dppComplete").value;
//     if (dppSelect == 'physics') {
//       physicsDppScore = Number(dppScoreValue);
//       physicsDppComplete = Number(dppCompleteValue);
//     } else if (dppSelect == 'maths') {
//       mathsDppScore = Number(dppScoreValue);
//       mathsDppComplete = Number(dppCompleteValue);
//     } else if (dppSelect == 'chemistry') {
//       chemistryDppScore = Number(dppScoreValue);
//       chemistryDppComplete = Number(dppCompleteValue);
//     }
//     // console.log(physicsDppScore);
//     let newdata = {
//       subject: dppSelect,
//       score: physicsDppScore,
//       complete: physicsDppComplete
//       //   date: {
//         //     day: d.getDate(),
//         //     month: d.getMonth() + 1
//         //   }
//       }
//      // module.exports = newdata;
//     // let g = [JSON.stringify(data.dpp.physics)]
//     // console.log(g);
//     // let k = g.push(JSON.stringify(newdata));
//     // console.log(k);
//     const createDataDpp = async () => {
//       try {
//         const  dppData = new Dpps({
//          subject: newdata.subject,
//          score: newdata.score,
//          complete: newdata.complete,
//          date: {
//            type: Date,
//            default: new Date
//          }

//    })
//         const result = await  dppData.save()
//         console.log(result);
//       } catch (err) {
//         console.log(err);
//       }
//     }


//     module.exports = createDataDpp()
//   }