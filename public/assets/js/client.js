fetch (`${window.location.origin}/api/v0/gallery`)
  .then(function(response){
    // json returned from server
    return response.json();
})
  .then(function(japan){
  // data Javascript object 
  console.log(japan);

  let output = '';

  japan.forEach(function(japan) {
    output += `<figure class="card">
                  <img src="/images/gallery/${japan.id}.jpg" alt="${japan.title}"
                  width="${japan.width}" height="${japan.height}">
                  <figcaption>
                    <h5>${japan.description}</h5>
                  </figcaption>
                </figure>`;
  });

  // container for images
  document.querySelector('.gallery').innerHTML = output;
})

.catch(function(error){
  if (error) {
    console.log ("Oh no! you've done something wrong");
  }
});
