
var $ = jQuery.noConflict();
var language = "en-GB";
var userid = "";
var MeetingId = '';
var UpcomingMeeting_PageNumber = 0;
var LiveMeeting_PageNumber = 0;
var PreviousMeeting_PageNumber = 0;
var onDataTable_UpcomingMeeting;
var onDataTable_LiveMeeting;
var onDataTable_PreviousMeeting;

function resetForm(id) {
    $('#' + id).each(function () {
        this.reset();
    });
}

function onListPanel() {
	$('.parsley-error-list').hide();
    $('#list-panel, .btn-form').show();
    $('#form-panel, .btn-list').hide();
}

function onFormPanel() {
    resetForm("DataEntry_formId");
	MeetingId = '';
    $('#list-panel, .btn-form').hide();
    $('#form-panel, .btn-list').show();
}

function onEditPanel() {
	
	getMeetingDetails();
	onClickSetting(1);
	
    $('#list-panel, .btn-form').hide();
    $('#form-panel, .btn-list').show();
}

function onBacktoFormPanel() {
	onClickSetting(1);
    onFormPanel();
}

function onClickSetting(id) {
	if(id == 1){
		$("#PreviousMeeting").hide();
		$("#ZoomSettings").hide();
		$("#LiveMeeting").hide();
		$("#UpcomingMeeting").show();
		$(".tabs-nav li a.active").removeClass("active");
		$("#tabId-"+id).addClass("active");
		
		onDataTableUpcomingMeeting();
		
		//DataTable Columns Adjust
		$($.fn.dataTable.tables(true)).DataTable().columns.adjust();
		
	} else if(id == 2){
		$("#UpcomingMeeting").hide();
		$("#ZoomSettings").hide();
		$("#PreviousMeeting").hide();
		$("#LiveMeeting").show();
		$(".tabs-nav li a.active").removeClass("active");
		$("#tabId-"+id).addClass("active");
		onListPanel();
		onDataTableLiveMeeting();
		
		//DataTable Columns Adjust
		$($.fn.dataTable.tables(true)).DataTable().columns.adjust();
		
	} else if(id == 3){
		$("#LiveMeeting").hide();
		$("#UpcomingMeeting").hide();
		$("#ZoomSettings").hide();
		$("#PreviousMeeting").show();
		$(".tabs-nav li a.active").removeClass("active");
		$("#tabId-"+id).addClass("active");
		onListPanel();
		onDataTablePreviousMeeting();
		
		//DataTable Columns Adjust
		$($.fn.dataTable.tables(true)).DataTable().columns.adjust();
		
	} else if(id == 4){
		$("#LiveMeeting").hide();
		$("#UpcomingMeeting").hide();
		$("#PreviousMeeting").hide();
		$("#ZoomSettings").show();
		$(".tabs-nav li a.active").removeClass("active");
		$("#tabId-"+id).addClass("active");
	}
}

function getStaffClientList() {
    $.ajax({
        "type": "POST",
        "url": api_url,
        "dataType": "jsonp",
        "data": 'id=1'
                + '&class=LiveMeeting'
                + '&method=getStaffClientList'
                + '&meeting_id='+MeetingId,
        async: false,
        cache: false,
        timeout: 30000,
        error: function () {
            return true;
        },
        "success": function (response) {
			var datalist = response;
			var html = '';
				html = '<option value="">Select staff/client</option>';
			$.each(datalist, function (key, obj) {
				html += '<option value="' + obj.staff_id + '">' + obj.staff_name + '</option>';
			});
			
			$("#StaffClient_id").html(html);
			$("#StaffClient_id").chosen();
			$("#StaffClient_id").trigger("chosen:updated");
        }
    });
}

$('#UpcomingMeeting_DataTableId').on( 'page.dt', function () {
	var info = onDataTable_UpcomingMeeting.page.info();
	UpcomingMeeting_PageNumber = info.page;
});

$('#LiveMeeting_DataTableId').on( 'page.dt', function () {
	var info = onDataTable_LiveMeeting.page.info();
	LiveMeeting_PageNumber = info.page;
});

$('#PreviousMeeting_DataTableId').on( 'page.dt', function () {
	var info = onDataTable_PreviousMeeting.page.info();
	PreviousMeeting_PageNumber = info.page;
});

function onDataTableUpcomingMeeting() {
	onDataTable_UpcomingMeeting = $('#UpcomingMeeting_DataTableId').DataTable({
		"responsive": true,
		"processing": true,
		"serverSide": true,
		"bSort": true,
		"sorting": [],
		"bDestroy": true,
		"bInfo": true,
		"bPaginate": true,
		"searching": false,
		"aLengthMenu": [[25, 50, 100], [25, 50, 100]],
		"iDisplayLength": 25,
		"sPaginationType": "full_numbers",
		"ajax": {
			"url": api_url,
			"dataType": "jsonp",
			"type": "POST",
			"data": function (data) {
				data.class = 'LiveMeeting';
				data.method = 'getUpcomingMeetingData';
				data["params"] = {
					"page_number": UpcomingMeeting_PageNumber
				}
			}
		},
		columns: [{
				data: null,
				className: "dt-center",
				sWidth: "5%",
				"searchable": false,
				"orderable": false,
				render: function (data, type, row, meta) {
					return  meta.row + meta.settings._iDisplayStart + 1;
				}
			}, {			
				data: "topic",
				"orderable": false,
				sWidth: "35%",
				className: "dt-left"
			}, {			
				data: "start_time",
				"orderable": false,
				sWidth: "13%",
				className: "dt-left"
			}, {			
				data: "id",
				"orderable": false,
				sWidth: "13%",
				className: "dt-center"
			}, {			
				data: null,
				className: "dt-center",
				sWidth: "12%",
				"searchable": false,
				"orderable": false,
				render: function (data, type, row, meta) {
					var Invitation = '';
					if(data.id !=''){
						Invitation = '<a onclick="getMeetingInvitation('+data.id+')" title="Meeting Invitation" href="javascript:void(0);" class="start-request">Invitation</a>';
					}
					return Invitation;
				}
			}, {			
				data: null,
				className: "dt-center",
				sWidth: "10%",
				"searchable": false,
				"orderable": false,
				render: function (data, type, row, meta) {
					var StartMeeting = '';
					if(data.join_url !=''){
						StartMeeting = '<a onclick="meetingStart('+"'"+data.join_url+"'"+')" href="#" title="Start Meeting" class="start-request start-meeting">Start</a>';
					}
					return StartMeeting;
				}
			},{
				data: null,
				sWidth: "12%",
				className: "dt-center",
				"searchable": false,
				"orderable": false,
				"bVisible": true,
				defaultContent: "<a class='editIconBtn' title='Edit' href='javascript:void(0);'><i class='fa fa-edit'></i></a>"
					+ "<a class='deleteIconBtn' title='Delete' href='javascript:void(0);'><i class='fa fa-remove'></i></a>"
			}
		]
	});
		
	$('#UpcomingMeeting_DataTableId').on('click', 'tr', function (e) {
		e.preventDefault();
		var cColumn = e.originalEvent.target;
		var className = cColumn.className;

		if ((className == 'editIconBtn')||(className == 'fa fa-edit')){
			var data = onDataTable_UpcomingMeeting.row(this).data();

			MeetingId = data.id;
			$("#MeetingId").val(data.id);
			
			var msg = "Do you really want to edit this record";
			onCustomModal(msg, "onEditPanel");
		}
		
		if((className=='deleteIconBtn')||(className=='fa fa-remove')){
			var data = onDataTable_UpcomingMeeting.row( this ).data();
			
			MeetingId = data.id; 

			var msg = "Do you really want to delete this record";		                	  
			onCustomModal(msg, "onDeleteUpcomingMeeting");
		}
	});
	
	$("#tw-loader").hide();
	
}

function onDataTableLiveMeeting() {
	onDataTable_LiveMeeting = $('#LiveMeeting_DataTableId').DataTable({
		"responsive": true,
		"processing": true,
		"serverSide": true,
		"bSort": true,
		"sorting": [],
		"bDestroy": true,
		"bInfo": true,
		"bPaginate": true,
		"searching": false,
		"aLengthMenu": [[25, 50, 100], [25, 50, 100]],
		"iDisplayLength": 25,
		"sPaginationType": "full_numbers",
		"ajax": {
			"url": api_url,
			"dataType": "jsonp",
			"type": "POST",
			"data": function (data) {
				data.class = 'LiveMeeting';
				data.method = 'getLiveMeetingData';
				data["params"] = {
					"page_number": LiveMeeting_PageNumber
				}
			}
		},
		columns: [{
				data: null,
				className: "dt-center",
				sWidth: "5%",
				"searchable": false,
				"orderable": false,
				render: function (data, type, row, meta) {
					return  meta.row + meta.settings._iDisplayStart + 1;
				}
			}, {			
				data: "topic",
				"orderable": false,
				sWidth: "35%",
				className: "dt-left"
			}, {			
				data: "start_time",
				"orderable": false,
				sWidth: "13%",
				className: "dt-left"
			}, {			
				data: "id",
				"orderable": false,
				sWidth: "13%",
				className: "dt-center"
			}, {			
				data: null,
				className: "dt-center",
				sWidth: "12%",
				"searchable": false,
				"orderable": false,
				render: function (data, type, row, meta) {
					var Invitation = '';
					if(data.id !=''){
						Invitation = '<a onclick="getMeetingInvitation('+data.id+')" title="Meeting Invitation" href="javascript:void(0);" class="start-request">Invitation</a>';
					}
					return Invitation;
				}
			}, {			
				data: null,
				className: "dt-center",
				sWidth: "10%",
				"searchable": false,
				"orderable": false,
				render: function (data, type, row, meta) {
					var StartMeeting = '';
					if(data.join_url !=''){
						StartMeeting = '<a onclick="meetingStart('+"'"+data.join_url+"'"+')" href="#" title="Start Meeting" class="start-request start-meeting">Start</a>';
					}
					return StartMeeting;
				}
			}
		]
	});
}

function onDataTablePreviousMeeting() {
	onDataTable_PreviousMeeting = $('#PreviousMeeting_DataTableId').DataTable({
		"responsive": true,
		"processing": true,
		"serverSide": true,
		"bSort": true,
		"sorting": [],
		"bDestroy": true,
		"bInfo": true,
		"bPaginate": true,
		"searching": false,
		"aLengthMenu": [[25, 50, 100], [25, 50, 100]],
		"iDisplayLength": 25,
		"sPaginationType": "full_numbers",
		"ajax": {
			"url": api_url,
			"dataType": "jsonp",
			"type": "POST",
			"data": function (data) {
				data.class = 'LiveMeeting';
				data.method = 'getPreviousMeetingData';
				data["params"] = {
					"page_number": PreviousMeeting_PageNumber
				}
			}
		},
		columns: [{
				data: null,
				className: "dt-center",
				sWidth: "5%",
				"searchable": false,
				"orderable": false,
				render: function (data, type, row, meta) {
					return  meta.row + meta.settings._iDisplayStart + 1;
				}
			}, {			
				data: "topic",
				"orderable": false,
				sWidth: "35%",
				className: "dt-left"
			}, {			
				data: "start_time",
				"orderable": false,
				sWidth: "13%",
				className: "dt-left"
			}, {			
				data: "id",
				"orderable": false,
				sWidth: "13%",
				className: "dt-center"
			}, {			
				data: null,
				className: "dt-center",
				sWidth: "12%",
				"searchable": false,
				"orderable": false,
				render: function (data, type, row, meta) {
					var Invitation = '';
					if(data.id !=''){
						Invitation = '<a onclick="getMeetingInvitation('+data.id+')" title="Meeting Invitation" href="javascript:void(0);" class="start-request">Invitation</a>';
					}
					return Invitation;
				}
			}, {			
				data: null,
				className: "dt-center",
				sWidth: "10%",
				"searchable": false,
				"orderable": false,
				render: function (data, type, row, meta) {
					var StartMeeting = '';
					if(data.join_url !=''){
						StartMeeting = '<a onclick="meetingStart('+"'"+data.join_url+"'"+')" href="#" title="Start Meeting" class="start-request">Start</a>';
					}
					return StartMeeting;
				}
			},{
				data: null,
				sWidth: "12%",
				className: "dt-center",
				"searchable": false,
				"orderable": false,
				"bVisible": true,
				defaultContent: "<a class='editIconBtn' title='Edit' href='javascript:void(0);'><i class='fa fa-edit'></i></a>"
					+ "<a class='deleteIconBtn' title='Delete' href='javascript:void(0);'><i class='fa fa-remove'></i></a>"
			}
		]
	});

	$('#PreviousMeeting_DataTableId').on('click', 'tr', function (e) {
		e.preventDefault();
		var cColumn = e.originalEvent.target;
		var className = cColumn.className;

		if ((className == 'editIconBtn')||(className == 'fa fa-edit')){
			var data = onDataTable_PreviousMeeting.row(this).data();

			MeetingId = data.id;
			$("#MeetingId").val(data.id);
			
			var msg = "Do you really want to edit this record";
			onCustomModal(msg, "onEditPanel");
		}
		
		if((className=='deleteIconBtn')||(className=='fa fa-remove')){
			var data = onDataTable_PreviousMeeting.row( this ).data();
			
			MeetingId = data.id; 

			var msg = "Do you really want to delete this record";		                	  
			onCustomModal(msg, "onDeletePreviousMeeting");
		}
	});	
}

function onConfirmWhenAddEdit() {

	$.ajax({
		"type": "POST",
		"url": api_url,
		"dataType": "jsonp",
        "data": $('#DataEntry_formId').serialize()
                + '&id=1'
                + '&class=LiveMeeting'
                + '&method=CreateMeeting',
		async: false,
		cache: false,
		timeout: 30000,
		error: function () {
			return true;
		},
		"success": function (response) {

			var msgType = response.msgType;
			var msg = response.msg;
			
			if (msgType == "success") {
				onSuccessMsg(msg);
				$("#UpcomingMeeting_DataTableId").dataTable().fnDraw();
				onListPanel();
			} else {
				onErrorMsg(msg);
			}
		}
	});
}

function getMeetingDetails() {

    $.ajax({
        "type": "POST",
        "url": api_url,
        "dataType": "jsonp",
        "data": '&class=LiveMeeting'
                + '&method=getMeetingDetails'
                + '&MeetingId=' + MeetingId,
        async: false,
        cache: false,
        timeout: 30000,
        error: function () {
            return true;
        },
        "success": function (response) {
			var datalist = response;
			$("#meeting_topic").val(datalist.topic);
			$('#meeting_date').val(datalist.start_time).datetimepicker('update');
			$("#meeting_duration").val(datalist.duration);
			
            if (datalist.host_video == 1) {
                document.getElementById("host_video").checked = true;
            } else {
                document.getElementById("host_video").checked = false;
            }
			
            if (datalist.participant_video == 1) {
                document.getElementById("participant_video").checked = true;
            } else {
                document.getElementById("participant_video").checked = false;
            }
			
            if (datalist.join_before_host == 1) {
                document.getElementById("enable_join_before_host").checked = true;
            } else {
                document.getElementById("enable_join_before_host").checked = false;
            }
			
            if (datalist.mute_upon_entry == 1) {
                document.getElementById("mute_participants_upon_entry").checked = true;
            } else {
                document.getElementById("mute_participants_upon_entry").checked = false;
            }
        }
    });
}

function onDeleteUpcomingMeeting() {

    $.ajax({
        "type": "POST",
        "url": api_url,
        "dataType": "jsonp",
        "data": '&class=LiveMeeting'
                + '&method=deleteMeeting'
                + '&MeetingId=' + MeetingId,
        async: false,
        cache: false,
        timeout: 30000,
        error: function () {
            return true;
        },
        "success": function (response) {

            var msgType = response.msgType;
            var msg = response.msg;
			
            if (msgType == "success") {
				$("#UpcomingMeeting_DataTableId").dataTable().fnDraw();
				onSuccessMsg(msg);
            } else {
                onErrorMsg(msg);
            }
        }
    });
}

function onDeletePreviousMeeting() {

    $.ajax({
        "type": "POST",
        "url": api_url,
        "dataType": "jsonp",
        "data": '&class=LiveMeeting'
                + '&method=deleteMeeting'
                + '&MeetingId=' + MeetingId,
        async: false,
        cache: false,
        timeout: 30000,
        error: function () {
            return true;
        },
        "success": function (response) {

            var msgType = response.msgType;
            var msg = response.msg;
			
            if (msgType == "success") {
				$("#PreviousMeeting_DataTableId").dataTable().fnDraw();
				onSuccessMsg(msg);
            } else {
                onErrorMsg(msg);
            }
        }
    });
}

function getMeetingInvitation(id) {
	
	MeetingId = id;

    $.ajax({
        "type": "POST",
        "url": api_url,
        "dataType": "jsonp",
        "data": '&class=LiveMeeting'
                + '&method=getMeetingDetails'
                + '&MeetingId=' + id,
        async: false,
        cache: false,
        timeout: 30000,
        error: function () {
            return true;
        },
        "success": function (response) {

			var CopyInvitation = '';
			CopyInvitation += '<p class="mb-0"><strong>Meeting Topic</strong>: '+response.topic+'</p>';
			CopyInvitation += '<p class="mb-10"><strong>Time</strong>: '+response.InvitationTime+' '+response.timezone+'</p>';
			CopyInvitation += '<p class="mb-10"><strong>Join Zoom Meeting</strong>: '+response.join_url+'</p>';
			CopyInvitation += '<p class="mb-0"><strong>Meeting ID</strong>: '+response.MeetingId+'</p>';
			CopyInvitation += '<p><strong>Passcode</strong>: '+response.password+'</p>';
			
			$("#CopyInvitation").html(CopyInvitation);
			
			getStaffClientList();
			
			onMeetingInvitationStaff();
			
			$('#Invitation_Meeting_Topic').val(response.topic);
			$('#Invitation_Time').val(response.InvitationTime);
			$('#Invitation_Timezone').val(response.timezone);
			$('#Invitation_join_url').val(response.join_url);
			$('#Invitation_password').val(response.password);
			
			$('#Meeting_Invitation_Id').modal('show');
			
        }
    });
}

function meetingStart(join_url) {
	window.open(join_url);
	return false;
}

function onAddMeetingInvitation() {

	$.ajax({
		"type": "POST",
		"url": api_url,
		"dataType": "jsonp",
        "data": $('#MeetingInvitation_formId').serialize()
                + '&id=1'
                + '&class=LiveMeeting'
                + '&method=insertMeetingInvitationData'
                + '&meeting_id='+MeetingId,
		async: false,
		cache: false,
		timeout: 30000,
		error: function () {
			return true;
		},
		"success": function (response) {

			var msgType = response.msgType;
			var msg = response.msg;
			
			if (msgType == "success") {
				getStaffClientList();
				onMeetingInvitationStaff();
				onSuccessMsg(msg);
			} else {
				onErrorMsg(msg);
			}
		}
	});
}

function onMeetingInvitationStaff() {

    $.ajax({
        "type": "POST",
        "url": api_url,
        "dataType": "jsonp",
        "data": 'id=1'
                + '&class=LiveMeeting'
                + '&method=getMeetingInvitationStaff'
                + '&meeting_id='+MeetingId,
        async: false,
        cache: false,
        timeout: 30000,
        error: function () {
            return true;
        },
        "success": function (response) {
			var data = response;
			
			var html = '';
			if(data.length>0){
				$.each(data, function (key, obj) {
					
					if(obj.photo != null){
						//var photo = '<img src="obj.photo">';
						var photo = '<img style="width: 20px;" src="'+base_url+'assets/images/avatar.jpg">';
					}else{
						var photo = '<img style="width: 20px;" src="'+base_url+'assets/images/avatar.jpg">';
					}
					
					if(obj.staff_name != null){
						var staff_name = obj.staff_name;
					}else{
						var staff_name = '';
					}
					
					html += '<tr>'
						+'<td><span class="list-photo">'+photo+'</span></td>'
						+'<td>'+staff_name+'</td>'
						+'<td class="text-center"><a onclick="onMeetingInvitationDelete('+obj.meeting_invitation_id+');" href="javascript:void(0)" title="Delete" class="delete_icon"><i class="fa fa-trash-o"></i></a></td>'
					+'</tr>';
				});
			}else{
				html = '<tr><td colspan="3"><div class="alert alert-warning" role="alert">No data available</div></td></tr>';
			}
			
			$("#staff_client_list_id").html(html);
        }
    });
}

function onMeetingInvitationDelete(meeting_invitation_id) {

    $.ajax({
        "type": "POST",
        "url": api_url,
        "dataType": "jsonp",
        "data": '&class=LiveMeeting'
                + '&method=deleteMeetingInvitation'
                + '&meeting_invitation_id=' + meeting_invitation_id
                + '&userid=' + userid
                + '&language=' + language,
        async: false,
        cache: false,
        timeout: 30000,
        error: function () {
            return true;
        },
        "success": function (response) {

            var msgType = response.msgType;
            var msg = response.msg;
			
            if (msgType == "success") {
				getStaffClientList();
				onMeetingInvitationStaff();
				onSuccessMsg(msg);
            } else {
                onErrorMsg(msg);
            }
        }
    });
}

function onAddEditZoomSettings() {

	$.ajax({
		"type": "POST",
		"url": api_url,
		"dataType": "jsonp",
        "data": $('#ZoomSettings_formId').serialize()
                + '&id=1'
                + '&class=LiveMeeting'
                + '&method=AddEditZoomSettings',
		async: false,
		cache: false,
		timeout: 30000,
		error: function () {
			return true;
		},
		"success": function (response) {

			var msgType = response.msgType;
			var msg = response.msg;
			
			if (msgType == "success") {
				onSuccessMsg(msg);
			} else {
				onErrorMsg(msg);
			}
		}
	});
}

function showPerslyError() {
    $('.parsley-error-list').show();
}

jQuery('#DataEntry_formId').parsley({
    listeners: {
        onFieldValidate: function (elem) {
            if (!$(elem).is(':visible')) {
                return true;
            }
            else {
                showPerslyError();
                return false;
            }
        },
        onFormSubmit: function (isFormValid, event) {
            if (isFormValid) {
                onConfirmWhenAddEdit();
                return false;
            }
        }
    }
});

jQuery('#ZoomSettings_formId').parsley({
    listeners: {
        onFieldValidate: function (elem) {
            if (!$(elem).is(':visible')) {
                return true;
            }
            else {
                showPerslyError();
                return false;
            }
        },
        onFormSubmit: function (isFormValid, event) {
            if (isFormValid) {
                onAddEditZoomSettings();
                return false;
            }
        }
    }
});

$(function () {
	"use strict";
	
	userid = $("#login_userid").val();

    $('#submit-form').click(function () {
        $("#DataEntry_formId").submit();
    });
	
    $('#zoomsettings-submit-form').click(function () {
        $("#ZoomSettings_formId").submit();
    });
	
	$("#staff_client_search_id").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$("#staff_client_list_id tr").filter(function() {
		  $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});
	
	$("#meeting_date").datetimepicker({
		 format: 'yyyy-mm-ddThh:ii:ss',
		autoclose: true,
		todayBtn: true
	});

	onDataTableUpcomingMeeting();
	
	$("#UpcomingMeeting_DataTableId_filter").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$("#UpcomingMeeting_DataTableId tbody tr").filter(function() {
		  $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});

	$("#LiveMeeting_DataTableId_filter").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$("#LiveMeeting_DataTableId tbody tr").filter(function() {
		  $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});

	$("#PreviousMeeting_DataTableId_filter").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$("#PreviousMeeting_DataTableId tbody tr").filter(function() {
		  $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});
	
}); 

