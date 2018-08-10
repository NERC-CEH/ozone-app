<ul id="accordion" class="table-view accordion">
  <li class="table-view-divider">
    <h4><%= t("Other causes of leaf damage") %></h4>
    <%= t("There are other possible causes of leaf damage that may be mistaken for ozone injury, which should not be included in this survey.") %></p>
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
        path: 'other-causes',
        selected: obj.selected
      }));
  });
  %>
</ul>


