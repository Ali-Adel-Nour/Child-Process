const { exec } = require('child_process');


execFile('./someFile.sh',(err, stdout, stderr) => {
  if (err) {
    console.log(`error: ${err.message}`);
    return;
  }

  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }

  console.log(`stdout: ${stdout}`);
})