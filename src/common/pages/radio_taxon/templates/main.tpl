<ul id="accordion" class="table-view accordion">
  <% 
    obj.data.forEach(function(branch) {
      print(obj.branchTemplate({
        parent: "accordion",
        id: branch.id,
        title: branch.title,
        data: branch,
        branchTemplate: obj.branchTemplate,
        leafTemplate: obj.leafTemplate
      }));
  });
  %>
</ul>


