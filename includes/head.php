<head>
    <!--Meta Start-->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="fairsketch">
    <link rel="icon" href="assets/images/favicon.png" />

    <script src="https://kit.fontawesome.com/b7b5fdc9a5.js" crossorigin="anonymous"></script>

    <title>Template</title>
    <!--Meta End-->

    <!--Helper JS Start-->
    <script type="text/javascript">
    AppHelper = {};
    AppHelper.baseUrl = "http://localhost/pms/project_canvas/html_n/";
    AppHelper.assetsDirectory = "http://localhost/pms/project_canvas/html_n/assets/";
    AppHelper.settings = {};
    AppHelper.settings.firstDayOfWeek = 0 || 0;
    AppHelper.settings.currencySymbol = "Tk";
    AppHelper.settings.currencyPosition = "left" || "left";
    AppHelper.settings.decimalSeparator = ".";
    AppHelper.settings.thousandSeparator = "";
    AppHelper.settings.noOfDecimals = ("2" == "0") ? 0 : 2;
    AppHelper.settings.displayLength = "10";
    AppHelper.settings.dateFormat = "Y-m-d";
    AppHelper.settings.timeFormat = "small";
    AppHelper.settings.scrollbar = "jquery";
    AppHelper.settings.enableRichTextEditor = "0";
    AppHelper.settings.notificationSoundVolume = "";
    AppHelper.settings.disableKeyboardShortcuts = "";
    AppHelper.userId = "";
    AppHelper.notificationSoundSrc = "http://localhost/pms/project_canvas/html_n/files/system/notification.mp3";

    //push notification
    AppHelper.settings.enablePushNotification = "";
    AppHelper.settings.userEnableWebNotification = "0";
    AppHelper.settings.userDisablePushNotification = "";
    AppHelper.settings.pusherKey = "";
    AppHelper.settings.pusherCluster = "";
    AppHelper.settings.pushNotficationMarkAsReadUrl =
        "http://localhost/pms/project_canvas/html_n/notifications/set_notification_status_as_read";
    AppHelper.https = "0";

    AppHelper.settings.disableResponsiveDataTableForMobile = "";
    AppHelper.settings.disableResponsiveDataTable = "";

    AppHelper.csrfTokenName = "rise_csrf_token";
    AppHelper.csrfHash = "50e894d6e347d3433286cf89509c3bd4";

    AppHelper.settings.defaultThemeColor = "1d2632";

    AppHelper.settings.timepickerMinutesInterval = 5;

    AppHelper.settings.weekends = "";
    </script>
    <!--Helper JS End-->

    <!--plugin language js Start-->
    <script type="text/javascript">
    AppLanugage = {};
    AppLanugage.locale = "en";
    AppLanugage.localeLong = "en-US";

    AppLanugage.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    AppLanugage.daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    AppLanugage.daysMin = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    AppLanugage.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
        "October", "November", "December"
    ];
    AppLanugage.monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    AppLanugage.today = "Today";
    AppLanugage.yesterday = "Yesterday";
    AppLanugage.tomorrow = "Tomorrow";

    AppLanugage.search = "Search";
    AppLanugage.noRecordFound = "No record found.";
    AppLanugage.print = "Print";
    AppLanugage.excel = "Excel";
    AppLanugage.printButtonTooltip = "Press escape when finished.";

    AppLanugage.fileUploadInstruction = "Drag-and-drop documents here <br /> (or click to browse...)";
    AppLanugage.fileNameTooLong = "Filename is too long.";

    AppLanugage.custom = "Custom";
    AppLanugage.clear = "Clear";

    AppLanugage.total = "Total";
    AppLanugage.totalOfAllPages = "Total of all pages";

    AppLanugage.all = "All";

    AppLanugage.preview_next_key = "Next (Right arrow key)";
    AppLanugage.preview_previous_key = "Previous (Left arrow key)";

    AppLanugage.filters = "Filters";
    </script>
    <!--plugin language js End-->

    <!--App JS-CSS Start-->
    <?php
    //We'll merge all css and js into sigle files. If you want to use the css separately, you can use it.

    /*
    $css = array(
        "assets/js/datatable/TableTools/css/dataTables.tableTools.min.css",
        "assets/js/datatable/responsive.dataTables.min.css",
        "assets/js/bootstrap-datepicker/css/datepicker3.css",
        "assets/js/bootstrap-timepicker/css/bootstrap-timepicker.min.css",
        "assets/js/dropzone/dropzone.min.css",
        "assets/js/magnific-popup/magnific-popup.css",
        "assets/js/perfect-scrollbar/perfect-scrollbar.css",
        "assets/js/awesomplete/awesomplete.css",
        "assets/js/atwho/css/jquery.atwho.min.css",
        "assets/css/font.css",
        "assets/css/style.css",
        "assets/css/media-style.css"
    );

    $js = array(
        "assets/js/jquery-1.11.3.min.js",
        "assets/bootstrap/js/bootstrap.min.js",
        "assets/js/jquery-validation/jquery.validate.min.js",
        "assets/js/jquery-validation/jquery.form.js",
        "assets/js/perfect-scrollbar/perfect-scrollbar.min.js",
        "assets/js/select2/select2.js",
        "assets/js/datatable/js/jquery.dataTables.min.js",
        "assets/js/datatable/responsive.dataTables.min.js",
        "assets/js/datatable/TableTools/js/dataTables.tableTools.min.js",
        "assets/js/datatable/TableTools/js/dataTables.buttons.min.js",
        "assets/js/datatable/TableTools/js/buttons.html5.min.js",
        "assets/js/datatable/TableTools/js/buttons.print.min.js",
        "assets/js/datatable/TableTools/js/jszip.min.js",
        "assets/js/bootstrap-datepicker/js/bootstrap-datepicker.js",
        "assets/js/bootstrap-timepicker/js/bootstrap-timepicker.min.js",
        "assets/js/fullcalendar/moment.min.js",
        "assets/js/dropzone/dropzone.min.js",
        "assets/js/magnific-popup/jquery.magnific-popup.min.js",
        "assets/js/sortable/sortable.min.js",
        "assets/js/flot/jquery.flot.min.js",
        "assets/js/flot/jquery.flot.pie.min.js",
        "assets/js/flot/jquery.flot.resize.min.js",
        "assets/js/flot/jquery.flot.categories.min.js",
        "assets/js/flot/curvedLines.js",
        "assets/js/flot/jquery.flot.tooltip.min.js",
        "assets/js/easypiechart/jquery.easypiechart.min.js",
        "assets/js/atwho/caret/jquery.caret.min.js",
        "assets/js/atwho/js/jquery.atwho.min.js",
        "assets/js/notification_handler.js",
        "assets/js/general_helper.js",
        "assets/js/app.min.js"
    );

    //to merge all files into one, we'll use this helper
    $this->load->helper('dev_tools');
    write_css($css);
    write_js($js);
    */
    $css_files = array(
        "assets/bootstrap/css/bootstrap.min.css",
        "assets/js/font-awesome/css/font-awesome.min.css", //don't combine this css because of the fonts path
        "assets/js/datatable/css/jquery.dataTables.min.css", //don't combine this css because of the images path
        "assets/js/select2/select2.css", //don't combine this css because of the images path
        "assets/js/select2/select2-bootstrap.min.css",
        "assets/css/app.all.css"
    );

    array_push($css_files, "assets/css/custom-style.css"); //add to last. custom style should not be merged

    $version=2.6;

    foreach ($css_files as $uri) {
        echo "<link rel='stylesheet' type='text/css' href='" . $uri . "?v=$version' />";
    }

    echo "<script type='text/javascript' src='assets/js/app.all.js?v=$version'></script>";
    ?>
    <!--App JS-CSS End-->

    <!--CSRF Start-->
    <script>
    var data = {};
    data[AppHelper.csrfTokenName] = AppHelper.csrfHash;
    $.ajaxSetup({
        data: data
    });
    </script>
    <!--CSRF End-->
</head>