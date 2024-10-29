document.body.addEventListener('keydown', (event)=>{
    document.getElementById('insert').innerHTML = `
    <table>
  <tr>
    <th>Key</th>
    <th>KeyCode</th>
    <th>Code</th>
  </tr>
  <tr>
    <td>${event.key === ' ' ? "Space" : event.key}</td>
    <td>${event.keyCode}</td>
    <td>${event.code}</td>
  </tr>
</table>`
})