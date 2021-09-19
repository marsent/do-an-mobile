/**
 * @swagger
 * /exam/admin:
 *   get:
 *     summary: Admin get all exam
 *     tags: ['Exam']
 *     parameters :
 *          - in : query
 *            name : limit
 *            type : number
 *            min : 0
 *            max : 50
 *          - in : query
 *            name : page
 *            type : number
 *            min : 1
 *          - in : query
 *            name : select
 *            type : string
 *          - in : query
 *            name : sort
 *            type : string
 *          - in : query
 *            name : created_by
 *            type : string
 *            description : available ("admin","lecture")
 *          - in : query
 *            name : time
 *            type : number
 *            min : 5
 *          - in : query
 *            name : for
 *            type : string
 *            description : available ("all","class","group")
 *          - in : query
 *            name : class_id
 *            type : string
 *          - in : query
 *            name : year
 *            type : number
 *     responses:
 *       200:
 *         description: The list of exam
 *   post :
 *      summary : Admin create exam
 *      tags : ['Exam']
 *      requestBody :
 *          content :
 *              application/json :
 *                  schema :
 *                      type : object
 *                      properties :
 *                          name  :
 *                              type : string,
 *                              required : true
 *                          for  :
 *                              type : string,
 *                              required : true
 *                              description : available ("all","class","group")
 *                          class_id :
 *                              type : string
 *                          student_ids :
 *                              type : array
 *                              items :
 *                                  type : string
 *                          questions :
 *                              type : array
 *                              items :
 *                                  type : object
 *                                  properties :
 *                                      question  :
 *                                          type : string
 *                                          required : true
 *                                      selection  :
 *                                          type : array
 *                                          items :
 *                                              type : string
 *                                          required : true
 *                                      answer :
 *                                          type : string
 *      responses :
 *          201:
 *              description: Create exam successfully
 */

/**
 * @swagger
 * /exam/admin/{id}:
 *   get:
 *     summary: Admin get exam via id
 *     tags: ['Exam']
 *     parameters :
 *          - in : query
 *            name : select
 *            type : string
 *     responses:
 *          200:
 *              description:  exam
 *   put :
 *     summary : Admin update exam by id
 *     tags : ['Exam']
 *     requestBody :
 *          content :
 *              application/json :
 *                  schema :
 *                      type : object
 *                      properties :
 *                          name  :
 *                              type : string,
 *                              required : true
 *                          for  :
 *                              type : string,
 *                              required : true
 *                              description : available ("all","class","group")
 *                          class_id :
 *                              type : string
 *                          student_ids :
 *                              type : array
 *                              items :
 *                                  type : string
 *                          questions :
 *                              type : array
 *                              items :
 *                                  type : object
 *                                  properties :
 *                                      question  :
 *                                          type : string
 *                                          required : true
 *                                      selection  :
 *                                          type : array
 *                                          items :
 *                                              type : string
 *                                          required : true
 *                                      answer :
 *                                          type : string
 *                          year :
 *                              type : number
 *                          time :
 *                              type : number
 *
 *     responses:
 *          200:
 *              description: Update exam successful
 *   parameters :
 *          - name : id
 *            in : path
 *            required : true
 *            type : string
 *
 */

/**
 * @swagger
 * /exam/admin/status/{id}:
 *   put:
 *     summary: Admin update exam status
 *     tags: ['Exam']
 *     requestBody :
 *          content :
 *              application/json :
 *                  schema :
 *                      type : object
 *                      properties :
 *                          status :
 *                              type : string
 *                              required : true
 *   parameters :
 *          - name : id
 *            in : path
 *            required : true
 *            type : string
 *
 *
 */

// lectureeeeeeeeeee

/**
 * @swagger
 * /exam/lecture:
 *   get:
 *     summary: lecture get all exam
 *     tags: ['Exam']
 *     parameters :
 *          - in : query
 *            name : limit
 *            type : number
 *            min : 0
 *            max : 50
 *          - in : query
 *            name : page
 *            type : number
 *            min : 1
 *          - in : query
 *            name : select
 *            type : string
 *          - in : query
 *            name : sort
 *            type : string
 *          - in : query
 *            name : year
 *            type : number
 *          - in : query
 *            name : time
 *            type : number
 *            min : 5
 *          - in : query
 *            name : for
 *            type : string
 *            description : available ("all","class","group")
 *          - in : query
 *            name : class_id
 *            type : string
 *     responses:
 *       200:
 *         description: The list of exam
 *   post :
 *      summary : Admin create exam
 *      tags : ['Exam']
 *      requestBody :
 *          content :
 *              application/json :
 *                  schema :
 *                      type : object
 *                      properties :
 *                          name  :
 *                              type : string,
 *                              required : true
 *                          for  :
 *                              type : string,
 *                              required : true
 *                              description : available ("all","class","group")
 *                          class_id :
 *                              type : string
 *                          student_ids :
 *                              type : array
 *                              items :
 *                                  type : string
 *                          questions :
 *                              type : array
 *                              items :
 *                                  type : object
 *                                  properties :
 *                                      question  :
 *                                          type : string
 *                                          required : true
 *                                      selection  :
 *                                          type : array
 *                                          items :
 *                                              type : string
 *                                          required : true
 *                                      answer :
 *                                          type : string
 *                          year :
 *                              type : number
 *                          time :
 *                              type : number
 *      responses :
 *          201:
 *              description: Create exam successfully
 */

/**
 * @swagger
 * /exam/lecture/{id}:
 *   get:
 *     summary: Lecture get exam via id
 *     tags: ['Exam']
 *     parameters :
 *          - in : query
 *            name : select
 *            type : string
 *     responses:
 *          200:
 *              description: List of exam
 *   put :
 *     summary : Lecture update exam by id
 *     tags : ['Exam']
 *     requestBody :
 *          content :
 *              application/json :
 *                  schema :
 *                      type : object
 *                      properties :
 *                          name  :
 *                              type : string,
 *                              required : true
 *                          for  :
 *                              type : string,
 *                              required : true
 *                              description : available ("all","class","group")
 *                          class_id :
 *                              type : string
 *                          student_ids :
 *                              type : array
 *                              items :
 *                                  type : string
 *                          questions :
 *                              type : array
 *                              items :
 *                                  type : object
 *                                  properties :
 *                                      question  :
 *                                          type : string
 *                                          required : true
 *                                      selection  :
 *                                          type : array
 *                                          items :
 *                                              type : string
 *                                          required : true
 *                                      answer :
 *                                          type : string
 *
 *     responses:
 *          200:
 *              description: Update exam successful
 *   parameters :
 *          - name : id
 *            in : path
 *            required : true
 *            type : string
 *
 */

/**
 * @swagger
 * /exam/lecture/status/{id}:
 *   put:
 *     summary: Lecture update exam status
 *     tags: ['Exam']
 *     requestBody :
 *          content :
 *              application/json :
 *                  schema :
 *                      type : object
 *                      properties :
 *                          status :
 *                              type : string
 *                              required : true
 *   parameters :
 *          - name : id
 *            in : path
 *            required : true
 *            type : string
 *
 *
 */

/**
 * @swagger
 * /exam/student:
 *   get:
 *     summary: Student get all
 *     tags: ['Exam']
 *     parameters :
 *          - in : query
 *            name : limit
 *            type : number
 *            min : 0
 *            max : 50
 *          - in : query
 *            name : page
 *            type : number
 *            min : 1
 *          - in : query
 *            name : select
 *            type : string
 *          - in : query
 *            name : sort
 *            type : string
 *          - in : query
 *            name : year
 *            type : number
 *          - in : query
 *            name : time
 *            type : number
 *            min : 5
 *          - in : query
 *            name : for
 *            type : string
 *            description : available ("all","class","group")
 *          - in : query
 *            name : class_id
 *            type : string
 *     responses:
 *       200:
 *         description: The list of exam
 *
 */

/**
 * @swagger
 * /exam/student/exam:
 *   get:
 *     summary: student get exam
 *     tags: ['Exam']
 *     parameters :
 *          - in : query
 *            name : limit
 *            type : number
 *            min : 0
 *            max : 50
 *          - in : query
 *            name : page
 *            type : number
 *            min : 1
 *          - in : query
 *            name : select
 *            type : string
 *          - in : query
 *            name : sort
 *            type : string
 *          - in : query
 *            name : created_by
 *            type : string
 *            description : available ("admin","lecture")
 *          - in : query
 *            name : time
 *            type : number
 *            min : 5
 *          - in : query
 *            name : for
 *            type : string
 *            description : available ("all","class","group")
 *          - in : query
 *            name : year
 *            type : number
 *     responses:
 *          200:
 *              description: List of exam
 *
 *
 */

/**
 * @swagger
 * /exam/student/exam/{id}:
 *   get:
 *     summary: Admin get exam via id
 *     tags: ['Exam']
 *     parameters :
 *          - in : query
 *            name : select
 *            type : string
 *     responses:
 *          200:
 *              description:  exam
 *   parameters :
 *          - name : id
 *            in : path
 *            required : true
 *            type : string
 *
 *
 */
