/**
 * @swagger
 * /class/admin:
 *   get:
 *     summary: Admin get all class
 *     tags: ['Class']
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
 *          - in : query
 *            name : year
 *            type : number
 *     responses:
 *       200:
 *         description: The list of class
 *   post :
 *      summary : Admin create class
 *      tags : ['Class']
 *      requestBody :
 *          content :
 *              application/json :
 *                  schema :
 *                      type : object
 *                      properties :
 *                          name  :
 *                              type : string
 *                              required : true
 *                          year :
 *                              type : number
 *                              required : true
 *                          faculty :
 *                              type : string
 *                              required : true
 *      responses :
 *          201:
 *              description: Create class successfully
 */

/**
 * @swagger
 * /class/admin/{id}:
 *   get:
 *     summary: Admin get class via id
 *     tags: ['Class']
 *     parameters :
 *          - in : query
 *            name : select
 *            type : string
 *     responses:
 *          200:
 *              description: List of class
 *   put :
 *     summary : Admin update class by id
 *     tags : ['Class']
 *     requestBody :
 *         content :
 *             application/json :
 *                  schema :
 *                      type : object
 *                      properties :
 *                          status :
 *                              type : string
 *                              description : (active or disabled)
 *                          year :
 *                              type : number
 *                          faculty :
 *                              type : string
 *                          name :
 *                              type : string
 *
 *     responses:
 *          200:
 *              description: Update class successful
 *   parameters :
 *          - name : id
 *            in : path
 *            required : true
 *            type : string
 *
 */

/**
 * @swagger
 * /class/:
 *   get:
 *     summary: class get own information
 *     tags: ['Class']
 *     responses:
 *       200:
 *         description: The list of the books
 *
 */

/**
 * @swagger
 * /class:
 *   put:
 *     summary: class ge class
 *     tags: ['Class']
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
