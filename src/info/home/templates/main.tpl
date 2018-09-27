<div class="app-logo">
  <img src="images/app_logo.png">
</div>

<!-- <div id="intro-snippet">
  Welcome to the ICP Vegetation Ozone Injury Recording App.
</div> -->

<ul id="buttons" class="table-view buttons">
  <li class="table-view-cell">
    <a href="#info/about" class="navigate-right">
      <span class="media-object pull-left icon icon-info"></span>
      About ozone injury
    </a>
  </li>
  <li class="table-view-cell">
    <a href="#info/symptoms" class="navigate-right">
      <span class="media-object pull-left icon icon-stethoscope"></span>
      Symptoms of ozone injury
    </a>
  </li>
  <li class="table-view-cell">
    <a href="#info/examples" class="navigate-right">
      <span class="media-object pull-left icon icon-leaf"></span>
      Examples of ozone injury
    </a>
  </li>
  <li class="table-view-cell">
    <a href="#info/other-causes" class="navigate-right">
      <span class="media-object pull-left icon icon-bug"></span>
      Other causes of leaf damage
    </a>
  </li>
  <li class="table-view-cell">
    <a id="sample-btn" class="navigate-right">
      <span class="media-object pull-left icon icon-plus"></span>
      Record ozone injury
    </a>
  </li>
  <li class="table-view-cell">
    <a id="list-btn" class="navigate-right">
      <span class="media-object pull-left icon icon-list"></span>
      <% if (obj.samples > 0) { %>
        <span class="badge <%- obj.needSync ? 'error' : '' %>"><%- obj.samples %></span>
        <% } %>
        Record list
    </a>
  </li>
  <li class="table-view-cell">
    <a href="#info" class="navigate-right">
      <span class="media-object pull-left icon icon-settings"></span>
      App information
    </a>
  </li>
</ul>

