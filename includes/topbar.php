<script type="text/javascript" src="assets/js/push_notification/pusher/pusher.min.js"></script>

<nav class="navbar navbar-default navbar-fixed-top" role="navigation" id="default-navbar">
    <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar" aria-expanded="false"
            aria-controls="navbar">
            <span class="fa fa-chevron-down"></span>
        </button>


        <a class="navbar-brand" href="#"><img class="dashboard-image" src="assets/images/logo.png" /></a>
    </div>

    <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav navbar-right inline-block">
            <li class="dropdown pr15 dropdown-user">
                <a id="user-dropdown-icon" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                    aria-expanded="false">
                    <span class="avatar-xs avatar pull-left mt-5 mr10">
                        <img alt="..." src="assets/images/avatar-bot.jpg">
                    </span><span class="topbar-user-name">Mr. Hasan</span> <span class="caret"></span></a>
                <ul class="dropdown-menu p0" role="menu">
                    <li><a href="#"><i class="fa fa-user mr10"></i>My Profile</a></li>
                    <li><a href="#"><i class="fa fa-key mr10"></i>Change Password</a></li>

                    <li class="divider"></li>
                    <li><a href="#"><i class="fa fa-power-off mr10"></i> Sign Out</a></li>
                </ul>
            </li>
        </ul>
    </div>
    <!--/.nav-collapse -->
</nav>

<script type="text/javascript">
//close navbar collapse panel on clicking outside of the panel
$(document).click(function(e) {
    if (!$(e.target).is('#navbar') && isMobile()) {
        $('#navbar').collapse('hide');
    }
});

$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});
</script>