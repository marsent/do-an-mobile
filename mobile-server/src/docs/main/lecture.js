/**
 * @swagger
 * /lecture/admin:
 *   get:
 *     summary: Admin get all lecture
 *     tags: ['Lecture']
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
 *            name : faculty
 *            type : string
 *            description : available ("computer_science","information_technology","data_science","computer_engineering","information_systems","e_commerce","software_engineering","information_security")
 *
 *     responses:
 *       200:
 *         description: The list of lecture
 *   post :
 *      summary : Admin create lecture
 *      tags : ['Lecture']
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
 *                          faculty :
 *                              type : string
 *                              required : true
 *      responses :
 *          201:
 *              description: Create lecture successfully
 */

/**
 * @swagger
 * /lecture/admin/{id}:
 *   get:
 *     summary: Admin get lecture via id
 *     tags: ['Lecture']
 *     parameters :
 *          - in : query
 *            name : select
 *            type : string
 *     responses:
 *          200:
 *              description: List of lectures
 *   put :
 *     summary : Admin update lecture by id
 *     tags : ['Lecture']
 *     requestBody :
 *         content :
 *             application/json :
 *                  schema :
 *                      type : object
 *                      properties :
 *                          status :
 *                              type : string
 *                          password :
 *                              type : string
 *                          faculty :
 *                              type : string
 *
 *     responses:
 *          200:
 *              description: Update lecture successful
 *   parameters :
 *          - name : id
 *            in : path
 *            required : true
 *            type : string
 *
 */

/**
 * @swagger
 * /lecture/:
 *   get:
 *     summary: lecture get own information
 *     tags: ['Lecture']
 *     responses:
 *       200:
 *         description: The list of the books
 *
 */

/**
 * @swagger
 * /lecture:
 *   put:
 *     summary: Lecture get info
 *     tags: ['Lecture']
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
 *     responses :
 *          200 :
 *              description : Update successfully
 *
 *
 */
