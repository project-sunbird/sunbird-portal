angular.module("playerApp.labels", [])
.constant("labels", {"MAIN_MENU":{"HOME":"Home","COURSES":"Courses","RESOURCES":"Library","COMMUNTIY":"Community","PROFILE":"Profile"},"Courses":{"resume":"RESUME","TODO":"To Do","COURSE_BADGE":"Course","update":"UPDATE"},"Notes":{"title":"Title","description":"Description","clear":"CLEAR","save":"SAVE","takeNote":"TAKE NOTE","addNote":"ADD NOTE","takeANote":"Take a note","update":"UPDATE","viewAll":"View All","myNoteBook":"My Notebook","myNotes":"My Notes","searchForNotesOrTitle":"Search for notes or title","search":"Search","edit":"Edit","delete":"Delete","deleteNote":"Delete Note","deleteConfirmMessage":"Are you sure to delete this note?","no":"NO","yes":"YES","imageLinkMessage":"http://example.com/images/diagram.jpg optional title ","ok":"Ok","cancel":"CANCEL","insertImage":"Insert Image"},"WORKSPACE":{"myWorkSpaceText":"My Workspace","start":"Create","drafts":"Draft","inReview":"Review Submissions","published":"Published","allUploads":"All Uploads","upForReview":"Up For Review","flagged":"Flagged","startCreating":{"textbook":"Book","textbookDescription":"Build books using study material for an interesting learning experience.","course":"Course","courseDescription":"Design courses using books, collections and study material. Courses are for a duration, to achieve an objective.","lesson":"Study Material","lessonDescription":"Create different study materials like story, game, activity, audio, video, using the inbuilt authoring tools.","collection":"Collection","collectionDescription":"Compile study material of your choice.","enterYoutubeURL":"ENTER URL","enterYoutubeURLButton":"Type or copy YouTube url","fileUploadOptions":"File accepted only pdf, mp4, epub, h5p and html zip (Max size 25mb).","uploadContent":"Upload Content","upload":"Upload","lessonPlanDescription":"Frame lesson plans with structured sections for an efficient learning experience.","lessonPlan":"Lesson Plan","contentUpload":"Upload Content","contentUploadDescription":"You can upload content here."},"createLesson":{"createLessonText":"Create Study Material","lessonTitle":"Name","youCanFillThisDL":"These details can be filled when adding content to study material."},"createCollection":{"createCollectionText":"Create Collection","collectionTitle":"Name","description":"Description","youCanFillThisDL":"These details can be filled when adding content to collection."},"createTextBook":{"createTextBookText":"Create Book","textBookTitle":"Name","youCanFillThisDL":"These details can be filled when adding content to book."},"createLessonPlan":{"createLessonPlanText":"Create Lesson Plan","lessonPlanTitle":"Name","youCanFillThisDL":"These details can be filled when adding content to lesson plan."},"createCourse":{"createCourseText":"Design Course","courseTitle":"Name","description":"Description","youCanFillThisDL":"These details can be filled when adding content to create course."},"previewContent":{"page":"Page","publish":"PUBLISH","reject":"REJECT","tryAgain":"TRY AGAIN","close":"CLOSE","author":"Author","language":"Medium","grades":"Class","subject":"Subject","lastUpdate":"Last update","createdOn":"Created on","status":"Status","delete":"DELETE","accept":"ACCEPT","discard":"DISCARD","flaggedReasons":"Flagged reason","flaggedBy":"Flagged by","flaggedDescription":"Flagged Description","medium":"Medium","description":"Description","contentInformation":"Content Information"},"common":{"concept":"Concepts","title":"Title","description":"Description","board":"Curriculum","medium":"Medium","subject":"Subject","grade":"Class","mimeType":"Mime Type","lessonType":"Lesson Type","audience":"Audience","language":"Medium","ageGroup":"Age Group","author":"Author","startCreating":"START CREATING","save":"SAVE","preview":"PREVIEW","closePreview":"CLOSE PREVIEW","submitForReview":"SEND FOR REVIEW","launchEditor":"LAUNCH EDITOR","upload":"Upload","uploadButton":"UPLOAD","closeUpload":"CLOSE UPLOAD","delete":"Delete","pleaseFillThisRD":"Please fill the details in below fields.","icon":"Add image","youCanFillThisDL":"You can fill in this details later","byProceedYouAgreedCollection":"All content created and uploaded here will be licensed under CC-BY 4.0.","byProceedYouAgreedCourse":"All content created and uploaded here will be licensed under CC-BY 4.0.","byProceedYouAgreedTextBook":"All content created and uploaded here will be licensed under CC-BY 4.0.","byProceedYouAgreedLesson":"All content created and uploaded here will be licensed under CC-BY 4.0.","byProceedYouAgreedLessonPlan":"All content created and uploaded here will be licensed under CC-BY 4.0.","action":"Action","actionName":"Action Name","apply":"Apply","deleteContent":"Delete Content","deleteConfirmMessage":"Are you sure to delete this content?","no":"No","yes":"Yes","DELETE":"DELETE","viewYourWorkspace":"View your workspace","resourceType":"Resource Type"}},"PROFILE":{"JOB_PROFILE":{"header":"Experience","jobName":"Occupation / Work Title","position":"Designation","organization":"Organization","subjects":"Subject(s) taught","isCurrentJob":"Is this your current job","currentJobOptionYes":"Yes","currentJobOptionNo":"No","joiningDate":"From ","endDate":"To"},"ADDRESS":{"header":"Address","addressType":"Select Address Type","addressTypePermanent":"Permanent","addressTypeCurrent":"Current","line1":"Address Line 1","line2":"Address Line 2","city":"City","state":"State","country":"Country","pinCode":"Pin code"},"EDUCATION":{"header":"Education","degree":"Degree","yearOfPassing":"Year of passing","institute":"Institution Name","grade":"Grade","percentage":"Percentage","board":"Board/University"},"BASIC_PROFILE":{"header":"Additional Information","name":"Name","email":"Email ID","phone":"Phone number","aadhar":"Aadhar number","gender":"Gender","male":"Male","female":"Female","transgender":"Transgender","language":"Language(s) known","dob":"Birthdate (dd/mm/yyyy)","subjects":"Subjects of expertise","summary":"Summary","contributions":"Contributions","contents":"Contents","currentLocation":"Current location","grades":"Grades","phone_Prompt":"Enter 10 digit phone number with country code"},"BUTTON":{"save":"SAVE","close":"CLOSE","edit":"EDIT","add":"ADD"},"BADGES":{"header":"Badges"},"COMPLETENESS":{"jobProfile":"experience","avatar":"profile picture","profileSummary":"profile description","firstName":"first name","lastName":"last name"},"SOCIAL_MEDIA":{"title":"Social media","facebook":"Facebook","twitter":"Twitter","linkedIn":"LinkedIn"}},"HEADER":{"profile":"Profile","workSpace":"Workspace","logout":"Logout","dashboard":"Admin dashboard","myActivity":"My Activity"},"CONTENT_FLAG":{"contentFlagText":"Flag content as inappropriate","courseFlagText":"Flag course as inappropriate","heading":"What went wrong?","description":"Let us know what went wrong, please mention the exact reasons so that we review this as soon as possible and address this issue super fast. Thanks for your feedback!","contentName":"CONTENT NAME","selectAReason":"SELECT A REASON","addYourComment":"ADD YOUR COMMENT","submit":"SUBMIT"},"CONTENT_SHARE":{"contentShareText":"Share","shareByTheLink":"Share by the link - ","copyLink":"COPY LINK","linkCopyToClipboard":"link copy to clipboard"},"BATCH":{"name":"NAME OF BATCH","description":"ABOUT THIS BATCH","startdate":"START DATE","enddate":"END DATE","enrollment":"NATURE OF BATCH","users":"MEMBERS IN THE BATCH","mentors":"MENTORS IN THE BATCH","participants":"SELECTED PARTICIPANTS","selectedmentors":"SELECTED MENTORS","courseBatches":"Course Batches"},"SEARCH":{"STATUS":{"INACTIVE":"Inactive","ACTIVE":"Active","BLOCKED":"Blocked","RETIRED":"Retired"},"BUTTONS":{"DOWNLOAD":"DOWNLOAD"},"FILTERS":"Filters","FILTER_BY":"Filter by","SORT":"Sort","APPLY":"APPLY","RESET":"RESET","SORT_BY_ALT":"Sort ascending or descending order","FILTER_ALT":"Filter","PROMPT":{"SEARCH_BOX":"Search courses, library","BOARD":"Curriculum","LANGUAGE":"Medium","SUBJECT":"Subjects","GRADES":"Grades","CONTENT_TYPE":"Content Types","CONCEPT":"Concepts","ORG_TYPE":"Org Type"}},"INSTRUCTIONS":{"HEADER":"Instructions :","SAMPLE":"Download the sample csv for reference.","COLUMNS":"CSV Columns:","MAX_COUNT_UESER":"Only upto 200 users can be uploaded with each csv file ","MAX_COUNT_ORGS":"Only upto 200 organizations can be uploaded with each csv file ","USERS":{"ONE":"'firstName', 'email', 'userName', 'password' fields are mandatory.","TWO":"If 'provider' is given, 'emailVerified' and 'phoneVerified' should be set to true. Else, they should be set to false.","THREE":"'roles', 'grade', 'language' and 'subject' can take multiple values. Sample format of list fields:  ENGLISH,HINDI .","FOUR":"Date of birth ('dob') field format is YYYY-MM-DD, e.g.: 1992-10-12."},"ORGANIZATIONS":{"ONE":"Organization name ('orgName') is mandatory","TWO":"If the organization is a tenant (like state), then it should be marked as a root org. I.e. 'isRootOrg' should be set as true, else it should be false.","THREE":"'channel' value is required if 'isRootOrg' is true.","FOUR":"'externalId' and 'provider' are mutually necessary, i.e. either both the values should be provided or not provided together.","contactDetails":"'contactDetail' should be in json format . eg:[{'address':'address','phone':'xxxxxxxx','fax':'xxxxx'}]."}},"BULK_UPLOAD":{"HEADERS":{"UPLOAD_ORG":"Upload Organizations","UPLOAD_USER":"Upload Users","STATUS":"Check Upload Status"},"CONTENT":{"FILE":"Uploaded File","PROCESS_ID":"Process ID","PROVIDER":"Provider","EXTERNAL_ID":"External Id","ORG_ID":"OrgId","SUCCESS":"Success Results","FAILURE":"Failure Results","TRACK_MESSAGE":"You can track progress with process ID","HELP_MESSAGE":"Please save the Process ID for your reference .You can track progress with process ID"},"BUTTONS":{"DOWNLOAD_SAMPLE":"DOWNLOAD SAMPLE CSV","UPLOAD_ORG":"UPLOAD ORGANIZATIONS CSV","UPLOAD_USERS":"UPLOAD USERS CSV","STATUS":"CHECK STATUS"}},"ADMIN":{"BUTTONS":{"YES":"YES","NO":"NO","UPDATE":"UPDATE"},"BLOCK":{"HEADER":"Block User","CONTENT":" Are you sure to Block  "},"UPDATE_ROLE":{"HEADER":"Select Role","ORG":"Org"},"BADGE":{"HEADER":"Assign Badge","CONTENT":"Do you want to assign  "}},"SETUP":{"header":"Org Types","addOrgType":"Add Org Type","add":"ADD","cancel":"CANCEL","update":"UPDATE","updateOrg":"Update Org Type"},"DASHBOARD":{"COURSE":{"CREATION_DASHBOARD":{"COURSE_NOT_SELECTED_LBL":"Course not selected!","COURSE_NOT_SELECTED_MSG":"Please select a course from the above list.","LIST_EMPTY_MSG":"You haven't created any course yet. Create new course and check the dashboard again.","DROPDOWN_PLACEHOLDER":"Select Course To See Dashboard"},"PROGRESS_DASHBOARD":{"NO_DATA_MSG":"No data found","STATS_FOR":"Stats for last","BATCH_DONE_STATUS":"Completed","BATCH_NOT_SELECTED":"Batch not selected!","BATCH_NOT_SELECTED_MSG":"Please select a batch from the above list.","LIST_EMPTY_MSG":"You haven't created a batch for this course yet. Create new batch and check the dashboard again.","REMOVE_ICON_TOOLTIP":"Close the dashboard","DROPDOWN_PLACEHOLDER":"Select Batch To See Dashboard"},"LIST_EMPTY_LBL":"Oops..."},"COMMON":{"FILTERS":{"SEVEN_DAYS":"LAST 7 DAYS","FOURTEEN_DAYS":"LAST 14 DAYS","FIVE_WEEKS":"LAST 5 WEEKS","FROM_BEGINING":"FROM BEGINING"},"SORT_BY":{"STATUS":"Status","USER_NAME":"User Name","BATCH_END":"Batch End On","ORG":"ORG","ENROLLED_ON":"Enrolled On"}}}});
