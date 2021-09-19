/**
 * @swagger
 * /student/admin:
 *   get:
 *     summary: Admin get all student
 *     tags: ['Student']
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
 *            min : 2020
 *          - in : query
 *            name : class_id
 *            type : string
 *
 *     responses:
 *       200:
 *         description: The list of student
 *   post :
 *      summary : Admin create student
 *      tags : ['Student']
 *      requestBody :
 *          content :
 *              application/json :
 *                  schema :
 *                      type : object
 *                      properties :
 *                          email :
 *                              type : string
 *                              required : true
 *                          phone :
 *                              type : string
 *                              required : true
 *                          full_name :
 *                              type : string
 *                              required : true
 *                          date_of_birth :
 *                              type : string
 *                              required : true
 *                          year :
 *                              type : string
 *                              required : true
 *                          class :
 *                              type : string
 *                              required : true
 *      responses :
 *          201:
 *              description: Create student successfully
 */

/**
 * @swagger
 * /student/admin/{id}:
 *   get:
 *     summary: Admin get Student via id
 *     tags: ['Student']
 *     parameters :
 *          - in : query
 *            name : select
 *            type : string
 *     responses:
 *          200:
 *              description: List of Students
 *   put :
 *     summary : Admin update student by id
 *     tags : ['Student']
 *     requestBody :
 *         content :
 *             application/json :
 *                  schema :
 *                      type : object
 *                      properties :
 *                          status :
 *                              type : string
 *                              description : (active or disabled)
 *                          password :
 *                              type : string
 *                          class_id :
 *                              type : string
 *
 *     responses:
 *          200:
 *              description: Update student successful
 *   parameters :
 *          - name : id
 *            in : path
 *            required : true
 *            type : string
 *
 */

/**
 * @swagger
 * /student/:
 *   get:
 *     summary: Student get own information
 *     tags: ['Student']
 *     responses:
 *       200:
 *         description: The list of the books
 *
 */

/**
 * @swagger
 * /Student:
 *   put:
 *     summary: Student ge Student
 *     tags: ['Student']
 *     requestBody :
 *          content :
 *              application/json :
 *                  schema :
 *                      type : object
 *                      properties :
 *                          email :
 *                              type : string
 *                          password :
 *                              type : string
 *                          class_id :
 *                              type : string
 *
 *
 */
