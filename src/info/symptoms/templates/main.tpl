<ul id="accordion" class="table-view accordion">
  <li class="table-view-divider">
    <h4><%= t("Symptoms of ozone damage") %></h4>
    Ozone pollution enters leaves through small pores on the leaf surface and causes damage to leaf cells.
  </li>
  <% 
    obj.data.forEach(function(branch) {
      print(obj.branchTemplate({
        parent: "accordion",
        id: branch.id,
        title: branch.title,
        data: branch,
        branchTemplate: obj.branchTemplate,
        leafTemplate: obj.leafTemplate,
        path: 'symptoms',
        selected: obj.selected
      }));
  });
  %>
</ul>


