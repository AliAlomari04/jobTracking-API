import swaggerJsdoc from 'swagger-jsdoc'

const options = {
    definition: {
        openapi:'3.0.0' ,
        info: {
            title:'Job application tracker API' ,
            version: '1.0.0' ,
            description:'API for tracking job application'
        } ,
        servers: [
            {url:'http://localhost:8081/api'}
        ],
        components:{
            securitySchemes:{
                bearerAuth:{
                    type:'http' ,
                    scheme:'bearer',
                    bearerFormat:'JWT'
                }
            }
        }
    },
    apis:['./src/routes/*.js']
}

export const swaggerSpec = swaggerJsdoc(options)