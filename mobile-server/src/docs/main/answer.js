/**
 * @swagger
 * /answer/admin:
 *   get:
 *     summary: Admin get all answer
 *     tags: ['Answer']
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
 *            name : time
 *            type : number
 *          - in : query
 *            name : class_id
 *            type : string
 *     responses:
 *       200:
 *         description: The list of answer
 */

/**
 * @swagger
 * /answer/admin/{id}:
 *   get:
 *     summary: Admin get answer via id
 *     tags: ['Answer']
 *     parameters :
 *          - in : query
 *            name : select
 *            type : string
 *     responses:
 *          200:
 *              description: answer
 *   parameters :
 *          - name : id
 *            in : path
 *            required : true
 *            type : string
 *
 */

/**
 * @swagger
 * /answer/admin/status/{id}:
 *   put:
 *     summary: Admin update answer status
 *     tags: ['Answer']
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
 * /answer/lecture:
 *   get:
 *     summary: Lecture get all answer
 *     tags: ['Answer']
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
 *            name : time
 *            type : number
 *          - in : query
 *            name : class_id
 *            type : string
 *          - in : query
 *            name : year
 *            type : number
 *     responses:
 *       200:
 *         description: The list of answer
 */

/**
 * @swagger
 * /answer/lecture/{id}:
 *   get:
 *     summary: Lecture get answer via id
 *     tags: ['Answer']
 *     parameters :
 *          - in : query
 *            name : select
 *            type : string
 *     responses:
 *          200:
 *              description: answer
 *   parameters :
 *          - name : id
 *            in : path
 *            required : true
 *            type : string
 *
 */

/**
 * @swagger
 * /answer/lecture/status/{id}:
 *   put:
 *     summary: Lecture update answer status
 *     tags: ['Answer']
 *     requestBody :
 *          content :
 *              application/json :
 *                  schema :
 *                      type : object
 *                      properties :
 *                          status :
 *                              type : string
 *                              required : true
 *     responses :
 *          200
 *   parameters :
 *          - name : id
 *            in : path
 *            required : true
 *            type : string
 *
 *
 */

// Studentttttttttttt
/**
 * @swagger
 * /answer/student:
 *   get:
 *     summary: student get all answer
 *     tags: ['Answer']
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
 *            name : time
 *            type : number
 *          - in : query
 *            name : year
 *            type : number
 *     responses:
 *       200:
 *         description: The list of answer
 */

/**
 * @swagger
 * /answer/student/{id}:
 *   get:
 *     summary: student get answer via id
 *     tags: ['Answer']
 *     parameters :
 *          - in : query
 *            name : select
 *            type : string
 *     responses:
 *          200:
 *              description: answer
 *   parameters :
 *          - name : id
 *            in : path
 *            required : true
 *            type : string
 *
 */

/**
 * @swagger
 * /answer/student/submit:
 *   post:
 *     summary: student submit answer
 *     tags: ['Answer']
 *     requestBody :
 *          content :
 *              application/json:
 *                  schema :
 *                      type : object
 *                      properties:
 *                          exam_id :
 *                              type : string
 *                              required: true
 *                          finish_time :
 *                              type : number
 *                              required: true
 *                          answer :
 *                              type : array
 *                              required: true
 *                              items :
 *                                  type : string
 *     responses:
 *       200:
 *         description: Submit successfully
 *
 */
