<p ng-hide="dataLoaded">
  <i class="fa fa-spinner fa-spin"></i>
</p>
<ul>
  <li ng-repeat="story in stories | orderBy:'title'">
    <p>
      <a href="#/story{{story.path}}">{{story.title}}</a>
    </p>
  </li>
</ul>