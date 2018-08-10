<ul id="accordion" class="table-view accordion">
  <li class="table-view-divider">
    <h4><%= t("Examples of Ozone Injury") %></h4>
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
        path: 'examples',
        selected: obj.selected
      }));
  });
  %>
</ul>


